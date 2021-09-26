import { useContext, useMemo } from 'react'
import { ConfigureProps } from '../../types'
import { DynamicNodeContext } from '../core/DynamicNode'
import { FlexContainerProps } from '../FlexContainer'

import styles from './index.module.css'

export interface FlexContainerConfig {
  direction?: 'vertical' | 'horizontal'
  root?: boolean
  fixedNested?: boolean
}

const FlexContainerConfigure: React.FC<ConfigureProps<FlexContainerConfig>> = ({ children }) => {
  const nodeContext = useContext(DynamicNodeContext)

  const props = useMemo<FlexContainerProps>(() => {
    const config = nodeContext.meta?.config as FlexContainerConfig | undefined
    const { direction = 'vertical', root = false, fixedNested = false } = config || {}

    return { direction, root, fixedNested }
  }, [nodeContext.meta?.config])

  return (
    <div className={styles.container}>
      {children(props)}
      {nodeContext.isActive && (
        <div
          className={styles.configure}
          onClick={(event) => {
            event.stopPropagation()
          }}
        >
          <div className={styles.action} onClick={() => nodeContext.remove()}>
            x
          </div>
          {nodeContext.meta?.children?.length ? (
            <div className={styles.action} onClick={() => nodeContext.repeat()}>
              rep
            </div>
          ) : null}
          {nodeContext.meta?.children?.length ? (
            <div
              className={styles.action}
              onClick={() => {
                nodeContext.updateConfig<FlexContainerConfig>((config) => {
                  config.direction = props.direction === 'horizontal' ? 'vertical' : 'horizontal'
                })
              }}
            >
              dir:{props.direction!.slice(0, 1)}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default FlexContainerConfigure
