import { FC } from 'react'
import { DynamicComponentBaseProps } from 'src/components'

const ContainerConfigure: FC<DynamicComponentBaseProps> = ({ node }) => {
  const { config } = node
  return (
    <div>
      <p>container configuration here</p>
      <pre>{JSON.stringify(config)}</pre>
    </div>
  )
}

export default ContainerConfigure
