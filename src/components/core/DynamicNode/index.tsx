import { createContext, useContext, useMemo } from 'react'
import { cloneNodeMeta, findCurrentMeta, findParentMeta } from '../../../utils'
import { componentMap, configureMap, defaultConfigure } from '../../../constants'
import { ConfigureProps, DynamicNodeMeta } from '../../../types'
import { DynamicRootContext } from '../DynamicRoot'

export interface DynamicNodeProps {
  meta: DynamicNodeMeta
  index: number
}

export const DynamicNodeContext = createContext<{
  meta?: DynamicNodeMeta
  indexPath: number[]
  isActive: boolean
  setActive: (value: boolean) => void
  remove: () => void
  repeat: () => void
  updateConfig: <Config>(callback: (config: Config) => void) => void
  parentMeta: DynamicNodeMeta | undefined
  Component: React.FC<any>
  Configure: React.FC<ConfigureProps<any>>
}>({
  indexPath: [],
  isActive: false,
  setActive: () => {},
  remove: () => {},
  repeat: () => {},
  updateConfig: () => {},
  parentMeta: undefined,
  Component: () => null,
  Configure: () => null,
})

const DynamicNode: React.FC<DynamicNodeProps> = ({ meta, index, children }) => {
  const rootContext = useContext(DynamicRootContext)
  const parentNodeContext = useContext(DynamicNodeContext)

  const { component } = meta
  const { meta: parentMeta } = parentNodeContext

  const Component = componentMap[component] as any
  const Configure = configureMap[component] ?? defaultConfigure

  const indexPath = useMemo(() => [...parentNodeContext.indexPath, index], [index, parentNodeContext.indexPath])

  const isActive = rootContext.activeId === meta.__uid
  const setActive = (value: boolean) => rootContext.setActiveId(value ? meta.__uid! : null)

  const remove = () => {
    rootContext.updateMeta?.((rootMeta) => {
      const parentMeta = findParentMeta(rootMeta, indexPath) || rootMeta

      if (parentMeta?.children) {
        parentMeta.children = parentMeta.children.filter((i) => i.__uid !== meta.__uid)
      }
    })
  }

  const repeat = () => {
    rootContext.updateMeta?.((rootMeta) => {
      const parentMeta = findParentMeta(rootMeta, indexPath) || rootMeta
      if (parentMeta?.children) {
        const currentIndex = parentMeta?.children.findIndex((i) => i.__uid === meta.__uid)
        const currentNodeMeta = parentMeta.children[currentIndex]
        if (currentIndex > -1) {
          parentMeta?.children.splice(currentIndex + 1, 0, cloneNodeMeta(currentNodeMeta))
        }
      }
    })
  }

  const updateConfig = <Config,>(callback: (config: Config) => void) => {
    rootContext.updateMeta?.((rootMeta) => {
      const currentMeta = findCurrentMeta(rootMeta, indexPath)
      if (currentMeta) {
        if (!currentMeta.config) {
          currentMeta.config = {}
        }
        callback(currentMeta.config)
      }
    })
  }

  return (
    <DynamicNodeContext.Provider
      value={{
        meta,
        indexPath,
        isActive,
        setActive,
        remove,
        repeat,
        updateConfig,
        parentMeta,
        Component,
        Configure,
      }}
    >
      {children}
    </DynamicNodeContext.Provider>
  )
}

export default DynamicNode
