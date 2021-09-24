import { createContext, useContext } from 'react'
import { findCurrentMeta, findParentMeta, indexNodeMeta } from '../../../utils'
import { componentMap, configureMap, defaultConfigure } from '../../../constants'
import { DynamicNodeMeta } from '../../../types'
import DynamicChildren from '../DynamicChildren'
import { DynamicRootContext } from '../DynamicRoot'

export interface DynamicNodeProps {
  meta: DynamicNodeMeta
  indexPath: number[]
}

export const DynamicNodeContext = createContext<{
  meta?: DynamicNodeMeta
  indexPath: number[]
  isActive: boolean
  setActive: (value: boolean) => void
  remove: () => void
  repeat: () => void
  updateConfig: <Config>(callback: (config: Config) => void) => void
}>({
  indexPath: [],
  isActive: false,
  setActive: () => {},
  remove: () => {},
  repeat: () => {},
  updateConfig: () => {},
})

const DynamicNode: React.FC<DynamicNodeProps> = ({ meta, indexPath }) => {
  const rootContext = useContext(DynamicRootContext)

  const { component, children } = meta

  const Component = componentMap[component] as any
  const ComponentConfigure = configureMap[component] ?? defaultConfigure

  const isActive = rootContext.activeId === meta.__dynamic_uid
  const setActive = (value: boolean) => rootContext.setActiveId(value ? meta.__dynamic_uid! : null)

  const remove = () => {
    rootContext.updateMeta?.((rootMeta) => {
      const parentMeta = findParentMeta(rootMeta, indexPath)
      if (parentMeta?.children) {
        parentMeta.children = parentMeta.children.filter((i) => i.__dynamic_uid !== meta.__dynamic_uid)
      }
    })
  }

  const repeat = () => {
    rootContext.updateMeta?.((rootMeta) => {
      const parentMeta = findParentMeta(rootMeta, indexPath)
      if (parentMeta?.children) {
        const currentIndex = parentMeta?.children.findIndex((i) => i.__dynamic_uid === meta.__dynamic_uid)
        const currentNodeMeta = parentMeta.children[currentIndex]
        if (currentIndex > -1) {
          parentMeta?.children.splice(currentIndex + 1, 0, indexNodeMeta(currentNodeMeta))
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
    <DynamicNodeContext.Provider value={{ meta, indexPath, isActive, setActive, remove, repeat, updateConfig }}>
      <ComponentConfigure>
        {(props: unknown) => (
          <Component {...props}>{children?.length ? <DynamicChildren children={children} /> : null}</Component>
        )}
      </ComponentConfigure>
    </DynamicNodeContext.Provider>
  )
}

export default DynamicNode
