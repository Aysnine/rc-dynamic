import { FC, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Store } from 'react-sortablejs'
import { DynamicComponentConfigureMap, DynamicComponentMap } from '..'
import { DynamicComponentBaseProps, DynamicTreeNode } from '../'

const DynamicTreeNodeComponent: FC<{
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
}> = ({ node, index, setTree, indexPath, activeId, setActiveId }) => {
  const Comp: FC<DynamicComponentBaseProps> = DynamicComponentMap[node.component]
  const CompMeta: FC<DynamicComponentBaseProps> = DynamicComponentConfigureMap[node.component]

  const setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void = useCallback(
    (currentNodes) => {
      setTree((sourceNodes) => {
        const tempNodes = [...sourceNodes]
        const _nodeIndex = [...indexPath]
        const lastIndex = _nodeIndex.pop()
        const lastArr = _nodeIndex.reduce((arr, i) => arr[i]['children'], tempNodes)
        lastArr[lastIndex]['children'] = currentNodes
        return tempNodes
      })
    },
    [indexPath, setTree]
  )

  // TODO need better implementation
  const setMeta = useCallback(
    (newMeta: DynamicTreeNode['meta']) => {
      node.meta = newMeta
      setTree((source) => [...source])
    },
    [node, setTree]
  )

  const compProps: DynamicComponentBaseProps = {
    node,
    index,
    setTree,
    setCurrentTree,
    indexPath,
    activeId,
    setActiveId,
    setMeta,
    meta: node.meta,
  }

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation()
      setActiveId(node.id)
    },
    [node.id, setActiveId]
  )

  const active = activeId === node.id

  return (
    <div
      style={{
        // TODO edit mode only
        outline: active ? '1px solid red' : '1px solid #2196f3',
        cursor: 'move',
        margin: '10px',
        backgroundColor: 'white',
      }}
      onClick={handleClick}
    >
      <Comp key={node.id} {...compProps} />
      {active &&
        createPortal(
          <div
            style={{
              outline: '1px solid green',
              padding: '5px',
              margin: '10px',
            }}
          >
            <p>ID: {node.id}</p>
            <CompMeta key={node.id} {...compProps} />
          </div>,
          document.body // TODO use custom dom ref
        )}
    </div>
  )
}

export default DynamicTreeNodeComponent
