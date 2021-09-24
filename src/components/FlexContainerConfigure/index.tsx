import { useContext, useMemo } from 'react'
import { ConfigureProps } from '../../types'
import { DynamicNodeContext } from '../core/DynamicNode'

import styles from './index.module.css'

export interface FlexContainerConfig {
  direction?: 'vertical' | 'horizontal'
}

const FlexContainerConfigure: React.FC<ConfigureProps<FlexContainerConfig>> = ({ children }) => {
  const nodeContext = useContext(DynamicNodeContext)

  const config = nodeContext.meta?.config as FlexContainerConfig | undefined
  const { direction = 'vertical' } = config || {}

  const props = useMemo(() => nodeContext.meta?.config ?? {}, [nodeContext.meta?.config])

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
          <div className={styles.action} onClick={() => nodeContext.setActive(false)}>
            x
          </div>
          <div className={styles.action} onClick={() => nodeContext.remove()}>
            del
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
                  config.direction = direction === 'horizontal' ? 'vertical' : 'horizontal'
                })
              }}
            >
              dir:{direction.slice(0, 1)}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default FlexContainerConfigure
