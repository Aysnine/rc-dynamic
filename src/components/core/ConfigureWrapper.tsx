import { FC } from 'react'
import { createPortal } from 'react-dom'
import { useKey } from 'react-use'
import { BaseProps } from '..'

const ConfigureWrapper: FC<BaseProps> = ({ node, panel, remove, inactive, activeId, children }) => {
  const active = activeId === node.id

  useKey('Backspace', () => active && remove(), undefined, [active, remove])

  if (!panel.current) return null

  return createPortal(
    <div
      onClick={(event) => {
        // ! https://github.com/facebook/react/issues/11387#issuecomment-355258340
        event.stopPropagation()
      }}
    >
      <div>
        <button onClick={inactive}>X</button>
        &nbsp; | &nbsp;
        <button onClick={remove}>Remove [Backspace]</button>
      </div>
      <p>
        <b>
          {node.component} - {node.id}
        </b>
      </p>
      <p>config：</p>
      <div className="config-wrapper">{children}</div>
      <p>meta：</p>
      <pre>{JSON.stringify(node.meta) || 'undefined'}</pre>
    </div>,
    panel.current
  )
}

export default ConfigureWrapper
