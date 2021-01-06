import { FC, useCallback } from 'react'
import { DynamicComponentBaseProps } from 'src/components'

const TextConfigure: FC<DynamicComponentBaseProps> = ({ node, setCurrentConfig }) => {
  const { config } = node

  const handleAppendX = useCallback(() => {
    setCurrentConfig({ ...config, value: (config.value ?? '') + 'x' })
  }, [config, setCurrentConfig])

  return (
    <div>
      <p>text configuration here</p>
      <pre>{JSON.stringify(config)}</pre>
      <button onClick={handleAppendX}>append x</button>
    </div>
  )
}

export default TextConfigure
