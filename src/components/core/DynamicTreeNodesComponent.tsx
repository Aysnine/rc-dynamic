import { TreeNode } from '@react-stately/data'
import { FC } from 'react'
import { DynamicTreeNode } from '../../types'
import DynamicTreeNodeComponent from './DynamicTreeNodeComponent'

const DynamicTreeNodesComponent: FC<{ nodes: TreeNode<DynamicTreeNode>[] }> = ({ nodes }) => {
  return (
    <>
      {nodes.map((i, index) => (
        <DynamicTreeNodeComponent key={i.key} node={i} index={index} />
      ))}
    </>
  )
}

export default DynamicTreeNodesComponent
