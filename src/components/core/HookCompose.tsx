import { ReactNode, useMemo } from 'react'
import get from 'lodash.get'
import { HookMapKey, HookMap } from '..'

interface MappingValue {
  value?: any
  from?: string
}
type ObjectMapping = Record<string, MappingValue>
type ArrayMapping = MappingValue[]

const resolveValue = ({ from, value }: MappingValue, map: Record<string, any>) => (from ? get(map, from, value) : value)
const arrayMapper = (mapping: ArrayMapping, map: Record<string, any>): any[] => mapping.map((i) => resolveValue(i, map))
const objectMapper = (mapping: ObjectMapping, map: Record<string, any>): any =>
  Object.entries(mapping).reduce((x, [key, value]) => ({ ...x, [key]: resolveValue(value, map) }), {})

export interface HookComposeMeta {
  hooks: Array<{ name: string; use: HookMapKey; args: ArrayMapping }>
  props: ObjectMapping
}

const HookCompose: React.FC<HookComposeMeta & { children: (props: Record<string, any>) => ReactNode }> = ({
  hooks,
  props: propsMapping,
  children,
}) => {
  const Comp: React.FC<{
    children: (props: Record<string, any>) => ReactNode
  }> = useMemo(() => {
    const use = (stackMap: Record<string, any>) => {
      const finalStackMap = hooks.reduce(
        (stackMap, { name, use, args }) => ({
          ...stackMap,
          [name]: HookMap[use]?.(...arrayMapper(args, stackMap)),
        }),
        stackMap
      )
      return objectMapper(propsMapping, finalStackMap)
    }

    return ({ children }) => {
      const props = use({})
      return <>{children(props)}</>
    }
  }, [hooks, propsMapping])

  return <Comp>{children}</Comp>
}

export default HookCompose
