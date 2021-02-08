import { FC, useCallback, useContext } from 'react'
import { TreeNodeContext } from 'src/components/core/TreeNode'

const ContainerConfigure: FC = () => {
  const { meta, setMeta } = useContext(TreeNodeContext)

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
