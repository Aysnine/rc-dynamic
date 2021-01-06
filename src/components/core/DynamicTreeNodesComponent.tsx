import { FC } from 'react'
import { DynamicTreeNode } from '../'
import DynamicTreeNodeComponent from './DynamicTreeNodeComponent'

const DynamicTreeNodesComponent: FC<{
  nodes: DynamicTreeNode[]
  setTree: React.Dispatch<React.SetStateAction<DynamicTreeNode[]>>
}> = ({ nodes, setTree }) => {
  return (
    <>

    </>
  )
}

export default DynamicTreeNodesComponent
