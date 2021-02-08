import { FC, useContext } from 'react'
import { createPortal } from 'react-dom'
import { eventBoundary } from '../utils'
import { TreeNodeContext } from './TreeNode'

const Configure: FC = ({ children }) => {
  const { node, panel, remove, duplicate, inactive, activeId } = useContext(TreeNodeContext)
  if (!panel.current || node.id !== activeId) return null

  return createPortal(
    <div onClick={eventBoundary}>
      <div>
        <button onClick={inactive}>X</button>
        &nbsp; | &nbsp;
        <button onClick={remove}>Remove</button>
        &nbsp;
        <button onClick={duplicate}>Duplicate</button>
      </div>
      <p>
        <b>
          {node.component} - {node.id}
        </b>
      </p>
      <p>config：</p>
      <div className="config-wrapper">TODO</div>
      <p>meta：</p>
      <pre>{JSON.stringify(node.meta) || 'undefined'}</pre>
    </div>,
    panel.current
  )
}

export default Configure
