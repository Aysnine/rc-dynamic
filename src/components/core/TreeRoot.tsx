import { FC, RefObject } from 'react'
import { DynamicTreeNode, Mode, normalSortableOptions } from '..'
import DynamicTreeNodeComponent from './TreeNode'
import { ReactSortable } from 'react-sortablejs'

const DynamicTreeRootComponent: FC<{
  tree: DynamicTreeNode[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
  mode: Mode
  panel: RefObject<HTMLDivElement>
}> = ({ tree, setTree, activeId, setActiveId, mode, panel }) => {
  return (
    <ReactSortable
      disabled={mode !== Mode.CREATIVE}
      list={tree}
      setList={setTree}
      {...normalSortableOptions}
      className="tree-root"
    >
      {tree.map((node, index) => (
        <DynamicTreeNodeComponent
          key={node.id}
          node={node}
          index={index}
          indexPath={[index]}
          setTree={setTree}
          activeId={activeId}
          setActiveId={setActiveId}
          mode={mode}
          panel={panel}
        />
      ))}
    </ReactSortable>
  )
}

export default DynamicTreeRootComponent
