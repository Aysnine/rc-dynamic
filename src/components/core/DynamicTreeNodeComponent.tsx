import { TreeNode } from '@react-stately/data'
import { FC } from 'react'
import { DynamicComponentMap } from '..'
import { DynamicComponentBaseProps, DynamicTreeNode } from '../../types'

const DynamicTreeNodeComponent: FC<{ node: TreeNode<DynamicTreeNode>; index: number }> = ({ node, index }) => {
  const Comp: FC<DynamicComponentBaseProps> = DynamicComponentMap[node.value.component]
  return <Comp key={node.key} node={node} index={index} />
}

export default DynamicTreeNodeComponent
