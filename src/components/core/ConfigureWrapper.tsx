import { FC, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { BaseProps } from '..'

const ConfigureWrapper: FC<BaseProps> = ({ node, setActiveId, panel, children }) => {
  const handleCancelActive = useCallback(() => {
    setActiveId('')
  }, [setActiveId])

  if (!panel.current) return null
  return createPortal(
    <div
      onClick={(event) => {
        // ! https://github.com/facebook/react/issues/11387#issuecomment-355258340
        event.stopPropagation()
      }}
    >
      <div>
        <button onClick={handleCancelActive}>X</button>
        &nbsp; | &nbsp;
        <button onClick={handleCancelActive}>Delete</button>
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
