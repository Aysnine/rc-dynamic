import { FC, MutableRefObject, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { Store } from 'react-sortablejs'
import { useUpdate } from 'react-use'
import { ConfigureMap, DynamicComponentMap } from '..'
import { BaseProps, DynamicTreeNode } from '..'

const DynamicTreeNodeComponent: FC<{
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
  panel: MutableRefObject<HTMLDivElement>
}> = ({ node, index, setTree, indexPath, activeId, setActiveId, panel }) => {
  const Comp: FC<BaseProps> = DynamicComponentMap[node.component]
  const CompMeta: FC<BaseProps> = ConfigureMap[node.component]

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

  const update = useUpdate()
  const setMeta = useCallback(
    (newMeta: DynamicTreeNode['meta']) => {
      node.meta = newMeta
      update()
    },
    [node, update]
  )

  const compProps: BaseProps = {
    node,
    index,
    setTree,
    setCurrentTree,
    indexPath,
    activeId,
    setActiveId,
    setMeta,
    meta: node.meta,
    panel,
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
        outline: active ? '2px solid #ffc107' : '1px solid #2196f3',
        cursor: 'move',
        margin: '10px',
        backgroundColor: 'white',
      }}
      onClick={handleClick}
    >
      <Comp key={node.id} {...compProps} />
      {active &&
        !!panel.current &&
        createPortal(
          <div>
            <ul>
              <li>ID: {node.id}</li>
              <li>Component: {node.component}</li>
            </ul>
            <hr />
            <CompMeta key={node.id} {...compProps} />
          </div>,
          panel.current
        )}
    </div>
  )
}

export default DynamicTreeNodeComponent
