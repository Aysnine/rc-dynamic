import { Store } from 'react-sortablejs'
import Container from './basic/Container'
import Text from './basic/Text'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
}

export type DynamicComponentKey = keyof typeof DynamicComponentMap

export interface DynamicTreeNode {
  id: string
  component: DynamicComponentKey
  // TODO
  config?: {
    value?: string
  }
  children?: DynamicTreeNode[]
}

export interface DynamicComponentBaseProps {
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
  setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void
}

export const normalSortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
  style: { overflow: 'auto' }, // TODO only edit mode for margin
}
