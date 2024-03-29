import { useContext, useMemo } from 'react'
import { ConfigureProps } from '../../types'
import { DynamicNodeContext } from '../core/DynamicNode'
import { FlexContainerProps } from '../FlexContainer'

import styles from './index.module.css'

export interface FlexContainerConfig {
  direction?: 'vertical' | 'horizontal'
  root?: boolean
  fixedChildren?: boolean
}

const FlexContainerConfigure: React.FC<ConfigureProps<FlexContainerConfig>> = ({ children }) => {
  const nodeContext = useContext(DynamicNodeContext)

  const props = useMemo<FlexContainerProps>(() => {
    const config = nodeContext.meta?.config as FlexContainerConfig | undefined
    const { direction = 'vertical', root = false, fixedChildren = false } = config || {}

    return { direction, root, fixedChildren }
  }, [nodeContext.meta?.config])

  const hasChildren = useMemo(() => nodeContext.meta?.children?.length, [nodeContext?.meta?.children])

  const canBeNested = useMemo(
    () =>
      nodeContext.meta?.children?.length &&
      nodeContext.meta.children.length >= 2 &&
      nodeContext.meta.children.every((i) => i.component === 'FlexContainer'),
    [nodeContext?.meta?.children]
  )

  const parentFixed = useMemo(() => {
    const parent = nodeContext.parentMeta
    return parent?.component === 'FlexContainer' && parent?.config?.fixedChildren
  }, [nodeContext])

  return (
    <>
      {children(
        props,
        <>
          {nodeContext.isActive && (
            <div
              className={styles.configure}
              onClick={(event) => {
                event.stopPropagation()
              }}
            >
              {!parentFixed ? (
                <div className={styles.action} onClick={() => nodeContext.remove()}>
                  x
                </div>
              ) : null}
              {hasChildren ? (
                <div className={styles.action} onClick={() => nodeContext.repeat()}>
                  rep
                </div>
              ) : null}
              {hasChildren ? (
                <>
                  {canBeNested ? (
                    <div
                      className={styles.action}
                      onClick={() => {
                        nodeContext.updateConfig<FlexContainerConfig>((config) => {
                          config.fixedChildren = !props.fixedChildren
                        })
                      }}
                    >
                      fx
                    </div>
                  ) : null}
                  {!props.fixedChildren ? (
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
                </>
              ) : null}
            </div>
          )}
        </>
      )}
    </>
  )
}

export default FlexContainerConfigure
