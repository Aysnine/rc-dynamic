import { useContext, useMemo } from 'react'
import classNames from 'classnames'
import { ReactSortable, SortableEvent } from 'react-sortablejs'
import { DynamicMode, SortableGroup } from '../../constants'
import { DynamicRootContext } from '../core/DynamicRoot'
import NodeWrapper, { ghostClass } from '../NodeWrapper'
import { equalChildrenIds } from '../../utils'
import DynamicNode from '../core/DynamicNode'
import { SortableNode } from '../../types'

import styles from './index.module.css'

const RootContainer: React.FC = () => {
  const rootContext = useContext(DynamicRootContext)

  const creative = rootContext.mode === DynamicMode.CREATIVE
  const children = useMemo(() => rootContext.meta?.children ?? [], [rootContext.meta?.children])
  const empty = !children.length

  const list: SortableNode[] = useMemo(() => children.map((i) => ({ id: i.__uid!, meta: i })), [children])

  const setList = (newList: SortableNode[], event?: SortableEvent) => {
    // ! Avoid frequent trigger
    if (event) {
      const previousChildren = children

      const currentChildren = newList
        // ! Avoid dirty item. eg: [undefined, { selected: true }]
        .filter(Boolean)
        .filter((i) => i.id)
        .map((i) => i.meta)

      // ! Avoid noisy item prop change. eg: [{ id: ..., raw: ..., chosen: false }]
      if (!equalChildrenIds(previousChildren, currentChildren)) {
        rootContext.updateMeta?.((rootMeta) => {
          rootMeta.children = currentChildren
        })
      }
    }
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.empty]: empty,
        [styles.creative]: creative,
      })}
    >
      <ReactSortable<SortableNode>
        handle={'.' + styles.rootItemHandle}
        list={list}
        setList={setList}
        animation={150}
        swapThreshold={0.5}
        // ! ReactSortable.group not use current value
        group={{ name: SortableGroup.RootContainer, put: true }}
        className={styles.rootContainer}
        ghostClass={ghostClass}
        clone={(item) => (item.clone ? item.clone() : item)}
      >
        {children.map((meta, index) => (
          <DynamicNode meta={meta} index={index} key={meta.__uid}>
            <NodeWrapper handleClassName={styles.rootItemHandle} />
          </DynamicNode>
        ))}
      </ReactSortable>
    </div>
  )
}

export default RootContainer
