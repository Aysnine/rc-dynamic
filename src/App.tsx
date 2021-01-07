import { useState } from 'react'
import { DynamicTreeNode } from './components'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'
import { mockTree } from './mockData'

const App = () => {
  const [tree, setTree] = useState<DynamicTreeNode[]>(mockTree)
  const [activeId, setActiveId] = useState<string>('')

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch', minHeight: 'calc(100vh - 20px)' }}>
      <div style={{ width: '300px', outline: '2px solid #d1c4e9', padding: '5px', margin: '10px' }}>
        TODO: components panel here
      </div>
      <div style={{ flex: '1', outline: '2px solid #d1c4e9', padding: '5px', margin: '10px' }}>
        <DynamicTreeRootComponent tree={tree} setTree={setTree} activeId={activeId} setActiveId={setActiveId} />
      </div>
      {!!activeId && (
        <div style={{ width: '300px', outline: '2px solid #d1c4e9', padding: '5px', margin: '10px' }}>
          <button onClick={() => setActiveId('')}>close</button>
          <div id="side-panel"></div>
        </div>
      )}
    </div>
  )
}

export default App
