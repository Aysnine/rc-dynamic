import { useContext, useMemo } from 'react'
import classNames from 'classnames'
import { ReactSortable, SortableEvent } from 'react-sortablejs'
import { SortableNode } from '../../types'
import { DynamicMode, SortableGroup } from '../../constants'
import { equalChildrenIds, findCurrentMeta } from '../../utils'
import { DynamicRootContext } from '../core/DynamicRoot'
import DynamicNode, { DynamicNodeContext } from '../core/DynamicNode'
import NodeWrapper, { ghostClass } from '../NodeWrapper'

import styles from './index.module.css'

export interface FlexContainerProps {
  direction?: 'vertical' | 'horizontal'
  fixedChildren?: boolean
}

const FlexContainer: React.FC<FlexContainerProps> = ({ direction = 'vertical', fixedChildren = false }) => {
  const rootContext = useContext(DynamicRootContext)
  const nodeContext = useContext(DynamicNodeContext)

  const creative = rootContext.mode === DynamicMode.CREATIVE
  const children = useMemo(() => nodeContext.meta?.children ?? [], [nodeContext.meta?.children])
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
          const nodeMeta = findCurrentMeta(rootMeta, nodeContext.indexPath)
          if (nodeMeta) {
            nodeMeta.children = currentChildren
          }
        })
      }
    }
  }

  return (
    <div
      className={classNames(styles.container, styles[direction], {
        [styles.empty]: empty,
        [styles.creative]: creative,
        [styles.fixed]: fixedChildren,
      })}
    >
      <ReactSortable<SortableNode>
        handle={'.' + styles.flexItemHandle}
        list={list}
        setList={setList}
        animation={150}
        swapThreshold={0.5}
        group={{ name: SortableGroup.FlexContainer, put: !fixedChildren }}
        className={styles.flexContainer}
        ghostClass={ghostClass}
        clone={(item) => (item.clone ? item.clone() : item)}
      >
        {children.map((meta, index) => (
          <DynamicNode meta={meta} index={index} key={meta.__uid}>
            <NodeWrapper className={styles.flexItem} handleClassName={styles.flexItemHandle} />
          </DynamicNode>
        ))}
      </ReactSortable>
    </div>
  )
}

export default FlexContainer
