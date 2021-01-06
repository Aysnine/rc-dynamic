import Container from './basic/Container'
import Text from './basic/Text'
import { TreeNode } from '@react-stately/data'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
}

export type DynamicComponentKey = keyof typeof DynamicComponentMap

export interface DynamicTreeNode {
  uid: string
  component: DynamicComponentKey
  // TODO
  config?: {
    value?: string
  }
  children?: DynamicTreeNode[]
}

export interface DynamicComponentBaseProps {
  node: TreeNode<DynamicTreeNode>
  index: number
}
