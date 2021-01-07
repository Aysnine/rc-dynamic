import { FC } from 'react'
import { BaseProps } from 'src/components'

const ContainerConfigure: FC<BaseProps> = ({ meta }) => {
  return (
    <div>
      <p>container configuration here</p>
      <pre>{JSON.stringify(meta)}</pre>
    </div>
  )
}

export default ContainerConfigure
