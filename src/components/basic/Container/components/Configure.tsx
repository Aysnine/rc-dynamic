import { FC } from 'react'
import { BaseProps } from '../../..'
import { ContainerMeta } from '..'

const ContainerConfigure: FC<BaseProps<ContainerMeta>> = ({ meta }) => {
  return (
    <div>
      <p>container configuration here</p>
    </div>
  )
}

export default ContainerConfigure
