import { useMemo, useState } from 'react'
import DynamicRoot from './components/core/DynamicRoot'
import MaterialPanel from './components/MaterialPanel'
import RootContainer from './components/RootContainer'
import { DynamicMode } from './constants'
import { mockMetaTree } from './mockData'
import { DynamicRootMeta } from './types'
import { indexRootMeta } from './utils'

import styles from './App.module.css'

const App = () => {
  const indexedMetaTree = useMemo(() => indexRootMeta(mockMetaTree), [])
  const [metaTree, setMetaTree] = useState<DynamicRootMeta>(indexedMetaTree)
  const [mode, setMode] = useState(DynamicMode.CREATIVE)

  return (
    <div className={styles.app}>
      <div className={styles.panel}>
        <MaterialPanel mode={mode} setMode={setMode} />
      </div>
      <div className={styles.content}>
        <DynamicRoot mode={mode} value={metaTree} onChange={setMetaTree}>
          <RootContainer />
        </DynamicRoot>
      </div>
    </div>
  )
}

export default App
