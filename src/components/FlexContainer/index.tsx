import React, { useContext, useMemo } from 'react'
import classNames from 'classnames'
import { ReactSortable, SortableEvent } from 'react-sortablejs'
import { DynamicMode } from '../../constants'
import { DynamicNodeMeta } from '../../types'
import { findCurrentMeta, hashChildren, indexNodeMeta } from '../../utils'
import DynamicNode, { DynamicNodeContext } from '../core/DynamicNode'
import { DynamicRootContext } from '../core/DynamicRoot'
import { isMaterialSortableNodeMeta, MaterialSortableNodeMeta } from '../MaterialPanel'

import styles from './index.module.css'

export const sortableGroupName = 'flex-container'
export interface SortableNodeMeta {
  id: string
  raw: DynamicNodeMeta
}

export interface FlexContainerProps {
  root?: boolean
  direction?: 'vertical' | 'horizontal'
}

const FlexContainer: React.FC<FlexContainerProps> = ({ root = false, direction = 'vertical' }) => {
  const rootContext = useContext(DynamicRootContext)
  const nodeContext = useContext(DynamicNodeContext)

  const list: SortableNodeMeta[] = useMemo(
    () =>
      nodeContext.meta?.children?.map((i) => ({
        id: i.__dynamic_uid!,
        raw: i,
      })) ?? [],
    [nodeContext.meta?.children]
  )

  const clone = (item: SortableNodeMeta) => {
    // * clone from MaterialPanel
    if ((item as unknown as MaterialSortableNodeMeta)?.cloneRaw && isMaterialSortableNodeMeta(item)) {
      const realItem = item as MaterialSortableNodeMeta
      const raw = indexNodeMeta(realItem.cloneRaw())
      return { id: raw.__dynamic_uid!, raw }
    }

    return item
  }

  const setList = (list: SortableNodeMeta[], event?: SortableEvent) => {
    if (event) {
      const newChildren = list
        // ! Avoid dirty item. eg: [undefined, { selected: true }]
        .filter(Boolean)
        .filter((i) => i.id)
        .map((i) => i.raw)

      const oldChildren = nodeContext.meta?.children

      // ! Avoid noisy item prop change. eg: [{ id: ..., raw: ..., chosen: false }]
      if (hashChildren(oldChildren) !== hashChildren(newChildren)) {
        rootContext.updateMeta?.((rootMeta) => {
          const nodeMeta = findCurrentMeta(rootMeta, nodeContext.indexPath)
          if (nodeMeta) {
            nodeMeta.children = newChildren
          }
        })
      }
    }
  }

  // * for control draggable
  const handleClassName = useMemo(
    () => (rootContext.mode === DynamicMode.CREATIVE ? styles.handle : ''),
    [rootContext.mode]
  )

  return (
    <div
      className={classNames(styles.container, styles[direction], {
        [styles.root]: root,
        [styles.empty]: !nodeContext.meta?.children?.length,
        [styles.editMode]: rootContext.mode === DynamicMode.CREATIVE,
      })}
    >
      <ReactSortable<SortableNodeMeta>
        handle={'.' + handleClassName}
        list={list}
        setList={setList}
        tag="div"
        animation={150}
        swapThreshold={1}
        group={sortableGroupName}
        className={styles.flexContainer}
        ghostClass={styles.flexItemGhost}
        clone={clone}
      >
        {nodeContext.meta?.children?.map((child, index) => {
          const childId = child.__dynamic_uid
          const indexPath = [...nodeContext.indexPath, index]
          const isActive = rootContext.activeId === childId
          return (
            <div
              key={childId}
              className={classNames(styles.flexItem, handleClassName, {
                [styles.nestedItemContainer]: child.component === 'FlexContainer',
                [styles.active]: isActive,
              })}
              onClick={(event) => {
                if (rootContext.mode !== DynamicMode.CREATIVE) return

                // ! disable configure for root container
                if (indexPath.length === 1) return

                event.stopPropagation()

                if (isActive) {
                  rootContext.setActiveId(null)
                } else {
                  rootContext.setActiveId(childId!)
                }
              }}
            >
              <DynamicNode indexPath={indexPath} meta={child} />
            </div>
          )
        })}
      </ReactSortable>
    </div>
  )
}

export default FlexContainer
