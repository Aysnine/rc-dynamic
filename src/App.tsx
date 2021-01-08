import { useCallback, useEffect, useRef } from 'react'
import { useLocalStorage, useUpdate } from 'react-use'
import { DynamicTreeNode } from './components'
import TreeRoot from './components/core/TreeRoot'
import { mockTree } from './mockData'

const App = () => {
  const [tree, setTree] = useLocalStorage<DynamicTreeNode[]>('tree', mockTree)
  const [activeId, setActiveId] = useLocalStorage<string>('activeId', '2')

  const handleResetDefault = useCallback(() => {
    setTree(mockTree)
    setActiveId('2')
  }, [setActiveId, setTree])

  const handleClear = useCallback(() => {
    setTree([])
    setActiveId('')
  }, [setActiveId, setTree])

  // ! force render for portal
  const panel = useRef<HTMLDivElement>(null)
  const update = useUpdate()
  useEffect(() => {
    update()
  }, [activeId, update])

  return (
    <div className="workspace">
      <div className="material-panel">
        <div>
          <button onClick={handleClear}>clear</button>
          &nbsp;
          <button onClick={handleResetDefault}>reset default</button>
        </div>
        <p>
          <b>Components</b>
        </p>
        <p>TODO</p>
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
