import { FC } from 'react'
import { BaseProps } from '../../..'
import { ContainerMeta } from '..'

const ContainerConfigure: FC<BaseProps<ContainerMeta>> = ({ meta }) => {
  return (
    <div>
      <p>container configuration here</p>
      <pre>{JSON.stringify(meta)}</pre>
    </div>
  )
}

export default ContainerConfigure
