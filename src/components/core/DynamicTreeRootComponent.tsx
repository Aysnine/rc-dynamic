import { FC } from 'react'
import { DynamicTreeNode, normalSortableOptions } from '../'
import DynamicTreeNodeComponent from './DynamicTreeNodeComponent'
import { ReactSortable } from 'react-sortablejs'

const DynamicTreeRootComponent: FC<{
  tree: DynamicTreeNode[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
}> = ({ tree, setTree }) => {
  return (
    <ReactSortable list={tree} setList={setTree} {...normalSortableOptions} style={{ overflow: 'auto' }}>
      {tree.map((node, index) => (
        <DynamicTreeNodeComponent key={node.id} node={node} index={index} indexPath={[index]} setTree={setTree} />
      ))}
    </ReactSortable>
  )
}

export default DynamicTreeRootComponent
