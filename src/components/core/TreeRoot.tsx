import { FC, RefObject } from 'react'
import { DynamicTreeNode, normalSortableOptions } from '..'
import DynamicTreeNodeComponent from './TreeNode'
import { ReactSortable } from 'react-sortablejs'

const DynamicTreeRootComponent: FC<{
  tree: DynamicTreeNode[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
  panel: RefObject<HTMLDivElement>
}> = ({ tree, setTree, activeId, setActiveId, panel }) => {
  return (
    <ReactSortable list={tree} setList={setTree} {...normalSortableOptions} className="tree-root">
      {tree.map((node, index) => (
        <DynamicTreeNodeComponent
          key={node.id}
          node={node}
          index={index}
          indexPath={[index]}
          setTree={setTree}
          activeId={activeId}
          setActiveId={setActiveId}
          panel={panel}
        />
      ))}
    </ReactSortable>
  )
}

export default DynamicTreeRootComponent
