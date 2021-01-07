import { FC } from 'react'
import { Store } from 'react-sortablejs'
import Container from './basic/Container'
import ContainerConfigure from './basic/Container/components/Configure'
import Text from './basic/Text'
import TextConfigure from './basic/Text/components/Configure'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
}

export type DynamicComponentKey = keyof typeof DynamicComponentMap

export const DynamicComponentConfigureMap: Record<DynamicComponentKey, FC<DynamicComponentBaseProps>> = {
  text: TextConfigure,
  container: ContainerConfigure,
}

export interface DynamicTreeNode<M = any> {
  id: string
  component: DynamicComponentKey
  meta?: M
  children?: DynamicTreeNode[]
}

export interface DynamicComponentBaseProps<M = any> {
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
  meta?: M
  setMeta: (newMeta: M) => void
}

export const normalSortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
  style: { overflow: 'auto' }, // TODO only edit mode for margin
}
