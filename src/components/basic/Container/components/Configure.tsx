import { FC, useCallback } from 'react'
import { BaseProps } from '../../..'
import { ContainerMeta } from '..'

const ContainerConfigure: FC<BaseProps<ContainerMeta>> = ({ meta, setMeta }) => {
  const handleSetVertical = useCallback(() => {
    setMeta({ ...(meta ?? {}), direction: 'vertical' })
  }, [meta, setMeta])

  const handleSetHorizontal = useCallback(() => {
    setMeta({ ...(meta ?? {}), direction: 'horizontal' })
  }, [meta, setMeta])

  return (
    <div>
      <button onClick={handleSetVertical}>set vertical</button>
      &nbsp;
      <button onClick={handleSetHorizontal}>set horizontal</button>
    </div>
  )
}

export default ContainerConfigure
