import { useEffect, useRef, useState } from 'react'
import { useUpdate } from 'react-use'
import { DynamicTreeNode } from './components'
import TreeRoot from './components/core/TreeRoot'
import { mockTree } from './mockData'

const App = () => {
  const [tree, setTree] = useState<DynamicTreeNode[]>(mockTree)
  const [activeId, setActiveId] = useState<string>('6')

  // ! force render for portal
  const panel = useRef<HTMLDivElement>(null)
  const update = useUpdate()
  useEffect(() => {
    update()
  }, [activeId, update])

  return (
    <div className="workspace">
      <div className="material-panel">
        TODO:
        <p>components panel here</p>
      </div>
      <div className="view-container">
        <TreeRoot tree={tree} setTree={setTree} activeId={activeId} setActiveId={setActiveId} panel={panel} />
      </div>
      {activeId ? (
        <div className="active-panel">
          <div ref={panel}></div>
        </div>
      ) : (
        <div className="active-panel-placeholder"></div>
      )}
    </div>
  )
}

export default App
