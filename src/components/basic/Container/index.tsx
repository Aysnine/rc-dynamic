import { FC } from 'react'
import { ReactSortable } from 'react-sortablejs'
import TreeNode from '../../core/TreeNode'
import { BaseProps, normalSortableOptions } from '../../'

export interface ContainerMeta {
  direction?: 'vertical' | 'horizontal'
}

const Container: FC<BaseProps<ContainerMeta>> = ({
  node,
  setTree,
  setCurrentTree,
  indexPath,
  activeId,
  setActiveId,
  panel,
}) => {
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
