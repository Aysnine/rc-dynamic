import { useState } from 'react'
import { DynamicTreeNode } from './components'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'
import { mockTree } from './mockData'

const App = () => {
  const [tree, setTree] = useState<DynamicTreeNode[]>(mockTree)
  const [activeId, setActiveId] = useState<string>('2')

  return (
    <div>
      <DynamicTreeRootComponent tree={tree} setTree={setTree} activeId={activeId} setActiveId={setActiveId} />
    </div>
  )
}

export default App
