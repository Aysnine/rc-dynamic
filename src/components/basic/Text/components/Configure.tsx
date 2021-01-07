import { FC, useCallback } from 'react'
import { DynamicComponentBaseProps } from 'src/components'

const TextConfigure: FC<DynamicComponentBaseProps> = ({ meta, setMeta }) => {
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
