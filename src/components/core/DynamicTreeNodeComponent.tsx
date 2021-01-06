import { FC, useCallback } from 'react'
import { Store } from 'react-sortablejs'
import { DynamicComponentMap } from '..'
import { DynamicComponentBaseProps, DynamicTreeNode } from '../'

const DynamicTreeNodeComponent: FC<{
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
}> = ({ node, index, setTree, indexPath }) => {
  const Comp: FC<DynamicComponentBaseProps> = DynamicComponentMap[node.component]

  const setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void = useCallback(
    (currentList) => {
      setTree((sourceList) => {
        const tempList = [...sourceList]
        const _nodeIndex = [...indexPath]
        const lastIndex = _nodeIndex.pop()
        const lastArr = _nodeIndex.reduce((arr, i) => arr[i]['children'], tempList)
        lastArr[lastIndex]['children'] = currentList
        return tempList
      })
    },
    [indexPath, setTree]
  )

  return (
    <div
      style={{
        // TODO edit mode only
        outline: '1px solid #2196f3',
        cursor: 'move',
        margin: '10px',
        backgroundColor: 'white',
      }}
    >
      <Comp
        key={node.id}
        node={node}
        index={index}
        setTree={setTree}
        setCurrentTree={setCurrentTree}
        indexPath={indexPath}
      />
    </div>
  )
}

export default DynamicTreeNodeComponent
