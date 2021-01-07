import { useEffect, useRef, useState } from 'react'
import { useUpdate } from 'react-use'
import { DynamicTreeNode } from './components'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'
import { mockTree } from './mockData'

const App = () => {
  const [tree, setTree] = useState<DynamicTreeNode[]>(mockTree)
  const [activeId, setActiveId] = useState<string>('')

  const panel = useRef<HTMLDivElement>(null)
  const update = useUpdate()
  useEffect(() => {
    update()
  }, [activeId, update])

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'stretch', minHeight: 'calc(100vh - 20px)' }}>
      <div style={{ width: '300px', outline: '2px solid #d1c4e9', padding: '5px', margin: '10px' }}>
        TODO: components panel here
      </div>
      <div style={{ flex: '1', outline: '2px solid #d1c4e9', padding: '5px', margin: '10px' }}>
        <DynamicTreeRootComponent
          tree={tree}
          setTree={setTree}
          activeId={activeId}
          setActiveId={setActiveId}
          panel={panel}
        />
      </div>
      {!!activeId && (
        <div style={{ width: '300px', outline: '2px solid #d1c4e9', padding: '5px', margin: '10px' }}>
          <button onClick={() => setActiveId('')}>close</button>
          <div ref={panel}></div>
        </div>
      )}
    </div>
  )
}

export default App
