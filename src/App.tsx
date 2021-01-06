import { useState } from 'react'
import { DynamicTreeNode } from './components'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'
import { mockTree } from './mockData'

const App = () => {
  const [tree, setTree] = useState<DynamicTreeNode[]>(mockTree)

  return (
    <div>
      <DynamicTreeRootComponent tree={tree} setTree={setTree} />
    </div>
  )
}

export default App
