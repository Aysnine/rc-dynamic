import { FC } from 'react'
import { DynamicComponentBaseProps, normalSortableOptions } from '../../'
import DynamicTreeNodeComponent from '../../core/DynamicTreeNodeComponent'
import { ReactSortable } from 'react-sortablejs'

const Container: FC<DynamicComponentBaseProps> = ({ node, setTree, setCurrentTree, indexPath }) => {
  return (
    <>
      <div style={{ padding: '5px' }}>container</div>
      <ReactSortable key={node.id} list={node.children} setList={setCurrentTree} {...normalSortableOptions}>
        {node.children.map((childBlock, index) => {
          return (
            <DynamicTreeNodeComponent
              key={childBlock.id}
              node={childBlock}
              index={index}
              indexPath={[...indexPath, index]}
              setTree={setTree}
            />
          )
        })}
      </ReactSortable>
    </>
  )
}

export default Container
