import { TreeData } from '@react-stately/data'
import { FC } from 'react'
import { DynamicTreeNode } from '../../types'
import DynamicTreeNodesComponent from './DynamicTreeNodesComponent'

const DynamicTreeRootComponent: FC<{ tree: TreeData<DynamicTreeNode> }> = ({ tree }) => {
  return <DynamicTreeNodesComponent nodes={tree.items} />
}

export default DynamicTreeRootComponent
