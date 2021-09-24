import { ReactNode } from 'react'
import { componentMap } from '../constants'

export type ComponentName = keyof typeof componentMap

export interface DynamicNodeMeta<Config = any> {
  component: ComponentName
  config?: Config
  children?: DynamicNodeMeta[]
  __dynamic_uid?: string
}

export interface DynamicRootMeta {
  version: string
  children?: DynamicNodeMeta[]
}

export interface ConfigureProps<ChildrenProps> {
  children: (props: ChildrenProps) => ReactNode
}
