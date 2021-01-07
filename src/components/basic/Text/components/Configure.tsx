import { FC, useCallback } from 'react'
import { BaseProps } from '../../..'
import { TextMeta } from '..'

const TextConfigure: FC<BaseProps<TextMeta>> = ({ meta, setMeta }) => {
  const handleAppendX = useCallback(() => {
    setMeta({ ...(meta ?? {}), value: (meta?.value ?? '') + 'x' })
  }, [meta, setMeta])

  return (
    <div>
      <button onClick={handleAppendX}>append x</button>
    </div>
  )
}

export default TextConfigure
