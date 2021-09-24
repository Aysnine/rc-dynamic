import React, { useContext, useMemo } from 'react'
import { DynamicNodeMeta } from '../../../types'
import DynamicNode, { DynamicNodeContext } from '../DynamicNode'

export interface DynamicChildrenProps {
  children?: DynamicNodeMeta[]
}

const DynamicChildren: React.FC<DynamicChildrenProps> = ({ children }) => {
  const parentNodeContext = useContext(DynamicNodeContext)

  const parentIndexPath = useMemo(() => parentNodeContext.indexPath ?? [], [parentNodeContext.indexPath])

  return (
    <>
      {children?.map((child, index) => (
        <DynamicNode key={child.__dynamic_uid} indexPath={[...parentIndexPath, index]} meta={child} />
      ))}
    </>
  )
}

export default DynamicChildren
