import classNames from 'classnames'
import { useContext } from 'react'
import { DynamicMode } from '../../constants'
import { DynamicNodeContext } from '../core/DynamicNode'
import { DynamicRootContext } from '../core/DynamicRoot'

import styles from './index.module.css'

interface Props {
  className?: string
  handleClassName: string
}

const CreativeWrapper: React.FC<Props> = ({ className, handleClassName }) => {
  const nodeContext = useContext(DynamicNodeContext)
  const rootContext = useContext(DynamicRootContext)

  // TODO to global
  const isNested = nodeContext.meta?.component === 'FlexContainer'
  const isParentFixed = nodeContext.parentMeta?.config?.fixedChildren
  const isFixed = nodeContext.meta?.config?.fixedChildren

  const creative = rootContext.mode === DynamicMode.CREATIVE

  const { isActive, Configure, Component } = nodeContext

  return (
    <Configure>
      {(props, configureNode) => (
        <div
          className={classNames(styles.container, className, {
            [handleClassName]: creative && !isParentFixed,

            [styles.creative]: creative,
            [styles.active]: isActive,
            [styles.nested]: isNested,
            [styles.fixed]: isFixed,
            [styles.parentFixed]: isParentFixed,
          })}
          onClick={(event) => {
            if (!creative || isParentFixed) return

            event.stopPropagation()

            nodeContext.setActive(!isActive)
          }}
        >
          <Component {...props} />
          {configureNode}
        </div>
      )}
    </Configure>
  )
}

export const ghostClass = styles.ghost

export default CreativeWrapper
