import { useMemo, useState } from 'react'
import styles from './App.module.css'
import DynamicRoot from './components/core/DynamicRoot'
import MaterialPanel from './components/MaterialPanel'
import { DynamicMode } from './constants'
import { mockMetaTree } from './mockData'
import { DynamicRootMeta } from './types'
import { indexRootMeta } from './utils'

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
        <DynamicRoot
          mode={mode}
          value={metaTree}
          onChange={(newMeta) => {
            setMetaTree(newMeta)
            console.log(newMeta)
          }}
        />
      </div>
    </div>
  )
}

export default App
