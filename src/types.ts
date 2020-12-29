import { TreeNode } from '@react-stately/data'
import { DynamicComponentKey } from './components'

export interface DynamicTreeNode {
  uid: string
  component: DynamicComponentKey
  config?: {
    foo?: number
  }
  children?: DynamicTreeNode[]
}

export interface DynamicComponentBaseProps {
  node: TreeNode<DynamicTreeNode>
  index: number
}
