import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useLocalStorage, useUpdate } from 'react-use'
import { DynamicTreeNode, Mode } from './components'
import MaterialPanel from './components/core/MaterialPanel'
import TreeRoot from './components/core/TreeRoot'
import { mockTree } from './mockData'
import { version } from '../package.json'

const defaultTree = mockTree
const defaultActiveId = '4'

const App = () => {
  const [mode, setMode] = useState<Mode>(Mode.CREATIVE)

  const [$tree = [], $setTree] = useLocalStorage<DynamicTreeNode[]>(version + '__tree', defaultTree)
  const [$activeId = '', $setActiveId] = useLocalStorage<string>(version + '__activeId', defaultActiveId)

  const [tree, setTree] = useState<DynamicTreeNode[]>($tree)
  const [activeId, setActiveId] = useState<string>($activeId)

  useEffect(() => {
    $setTree(tree)
    $setActiveId(activeId)
  }, [tree, activeId, $setTree, $setActiveId])

  const handleResetDefault = useCallback(() => {
    setTree(defaultTree)
    setActiveId(defaultActiveId)
  }, [setActiveId, setTree])

  const handleClear = useCallback(() => {
    setTree([])
    setActiveId('')
  }, [setActiveId, setTree])

  const handleToRuntimeMode = useCallback(() => {
    setMode(Mode.RUNTIME)
  }, [])

  const handleToCreativeMode = useCallback(() => {
    setMode(Mode.CREATIVE)
  }, [])

  // ! force render for portal
  const panel = useRef<HTMLDivElement>(null)
  const update = useUpdate()
  useEffect(() => {
    update()
  }, [activeId, update])

  return (
    <div className={`workspace mode-${mode}`}>
      {mode === Mode.CREATIVE && (
        <div className="material-panel">
          <div>
            <button onClick={handleClear}>clear</button>
            &nbsp;
            <button onClick={handleResetDefault}>reset default</button>
            &nbsp;
            <button onClick={handleToRuntimeMode}>M:R</button>
          </div>
          <p>
            <b>Components</b>
          </p>
          <MaterialPanel />
        </div>
      )}
      <div className="view-container">
        <TreeRoot
          tree={tree}
          setTree={setTree}
          activeId={activeId}
          setActiveId={setActiveId}
          panel={panel}
          mode={mode}
        />
      </div>
      {mode === Mode.CREATIVE ? (
        activeId ? (
          <div className="active-panel">
            <div ref={panel}></div>
          </div>
        ) : (
          <div className="active-panel-placeholder"></div>
        )
      ) : (
        <div className="runtime-helper">
          <button onClick={handleToCreativeMode}>M:C</button>
        </div>
      )}
    </div>
  )
}

export default App
