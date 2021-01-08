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
  meta,
}) => {
  const direction = meta?.direction ?? 'vertical'

  return (
    <>
      <div style={{ padding: '5px', paddingBottom: 0 }}>container</div>
      <ReactSortable
        key={node.id}
        {...normalSortableOptions}
        list={node.children ?? []}
        setList={setCurrentTree}
        className={`container ${direction}`}
      >
        {node.children?.map((childNode, index) => (
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
