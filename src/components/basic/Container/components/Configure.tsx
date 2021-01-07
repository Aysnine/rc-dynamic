import { FC } from 'react'
import { DynamicComponentBaseProps } from 'src/components'

const ContainerConfigure: FC<DynamicComponentBaseProps> = ({ meta }) => {
  return (
    <div>
      <p>container configuration here</p>
      <pre>{JSON.stringify(meta)}</pre>
    </div>
  )
}

export default ContainerConfigure
