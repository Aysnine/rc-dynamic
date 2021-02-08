import { FC, useContext } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { TreeNodeContext } from 'src/components/core/TreeNode'
import { Mode, normalSortableOptions } from '../../'

export interface ContainerProps {
  direction?: 'vertical' | 'horizontal'
}

const Container: FC<ContainerProps> = ({ children }) => {
  const { node, setCurrentTree, meta, mode } = useContext(TreeNodeContext)

  const direction = meta?.direction ?? 'vertical'
  const wrapperClassName = `container ${direction}`

  if (mode === Mode.RUNTIME) {
    return <div className={wrapperClassName}>{children}</div>
  }

  if (mode === Mode.CREATIVE) {
    return (
      <>
        {mode === Mode.CREATIVE && <div style={{ padding: '5px', paddingBottom: 0 }}>container</div>}
        <ReactSortable
          {...normalSortableOptions}
          list={node.children ?? []}
          setList={setCurrentTree}
          className={wrapperClassName}
        >
          {children}
        </ReactSortable>
      </>
    )
  }

  return null
}

export default Container
