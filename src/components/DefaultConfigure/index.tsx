import { useContext, useMemo } from 'react'
import { ConfigureProps } from '../../types'
import { DynamicNodeContext } from '../core/DynamicNode'

import styles from './index.module.css'

const DefaultConfigure: React.FC<ConfigureProps<any>> = ({ children }) => {
  const nodeContext = useContext(DynamicNodeContext)

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
          <div className={styles.action} onClick={() => nodeContext.remove()}>
            x
          </div>
        </div>
      )}
    </div>
  )
}

export default DefaultConfigure
