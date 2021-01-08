import { FC, MutableRefObject } from 'react'
import { Store } from 'react-sortablejs'
import Container from './basic/Container'
import ContainerConfigure from './basic/Container/components/Configure'
import Text from './basic/Text'
import TextConfigure from './basic/Text/components/Configure'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
}

export type ComponentKey = keyof typeof DynamicComponentMap

export const ConfigureMap: Record<ComponentKey, FC<BaseProps>> = {
  text: TextConfigure,
  container: ContainerConfigure,
}

export interface DynamicTreeNode<M = any> {
  id: string
  component: ComponentKey
  meta?: M
  children?: DynamicTreeNode[]
}

export interface BaseProps<M = any> {
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void
  meta?: M
  setMeta: (newMeta: M) => void
  activeId: string
  setActiveId: React.Dispatch<React.SetStateAction<string>>
  panel: MutableRefObject<HTMLDivElement>
  update: () => void
  remove: () => void
  inactive: () => void
}

export const normalSortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
  style: { overflow: 'auto' }, // TODO only edit mode for margin
}
