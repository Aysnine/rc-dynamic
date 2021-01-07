import { FC } from 'react'
import { DynamicComponentBaseProps, normalSortableOptions } from '../../'
import DynamicTreeNodeComponent from '../../core/DynamicTreeNodeComponent'
import { ReactSortable } from 'react-sortablejs'

const Container: FC<DynamicComponentBaseProps> = ({
  node,
  setTree,
  setCurrentTree,
  indexPath,
  activeId,
  setActiveId,
}) => {
  return (
    <>
      <div style={{ padding: '5px' }}>container</div>
      <ReactSortable key={node.id} list={node.children} setList={setCurrentTree} {...normalSortableOptions}>
        {node.children.map((childNode, index) => (
          <DynamicTreeNodeComponent
            key={childNode.id}
            node={childNode}
            index={index}
            indexPath={[...indexPath, index]}
            setTree={setTree}
            activeId={activeId}
            setActiveId={setActiveId}
          />
        ))}
      </ReactSortable>
    </>
  )
}

export default Container
