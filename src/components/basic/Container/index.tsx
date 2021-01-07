import { FC } from 'react'
import { BaseProps, normalSortableOptions } from '../../'
import TreeNode from '../../core/TreeNode'
import { ReactSortable } from 'react-sortablejs'

const Container: FC<BaseProps> = ({ node, setTree, setCurrentTree, indexPath, activeId, setActiveId, panel }) => {
  return (
    <>
      <div style={{ padding: '5px' }}>container</div>
      <ReactSortable key={node.id} list={node.children} setList={setCurrentTree} {...normalSortableOptions}>
        {node.children.map((childNode, index) => (
          <TreeNode
            key={childNode.id}
            node={childNode}
            index={index}
            indexPath={[...indexPath, index]}
            setTree={setTree}
            activeId={activeId}
            setActiveId={setActiveId}
            panel={panel}
          />
        ))}
      </ReactSortable>
    </>
  )
}

export default Container
