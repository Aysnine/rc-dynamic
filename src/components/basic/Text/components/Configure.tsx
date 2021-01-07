import { FC, useCallback } from 'react'
import { BaseProps } from 'src/components'

const TextConfigure: FC<BaseProps> = ({ meta, setMeta }) => {
  const handleAppendX = useCallback(() => {
    setMeta({ ...meta, value: (meta.value ?? '') + 'x' })
  }, [meta, setMeta])

  return (
    <div>
      <p>text configuration here</p>
      <pre>{JSON.stringify(meta)}</pre>
      <button onClick={handleAppendX}>append x</button>
    </div>
  )
}

export default TextConfigure
