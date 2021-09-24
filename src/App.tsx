import { useMemo, useState } from 'react'
import styles from './App.module.css'
import DynamicRoot from './components/core/DynamicRoot'
import MaterialPanel from './components/MaterialPanel'
import { DynamicMode } from './constants'
import { DynamicRootMeta } from './types'
import { indexRootMeta } from './utils'

const mockMetaTree: DynamicRootMeta = {
  version: '0',
  children: [
    {
      component: 'FlexContainer',
      config: {
        root: true,
      },
      children: [
        {
          component: 'FlexContainer',
          children: [],
        },
        {
          component: 'FlexContainer',
          children: [
            {
              component: 'Text',
              config: {
                content: 'Text A',
              },
            },
          ],
        },
        {
          component: 'FlexContainer',
          children: [
            {
              component: 'Text',
              config: {
                content: 'Text B',
              },
            },
            {
              component: 'Text',
              config: {
                content: 'Text C',
              },
            },
            {
              component: 'Text',
              config: {
                content: 'Text D',
              },
            },
          ],
        },
      ],
    },
  ],
}

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
            // console.log('x', newMeta)
          }}
        />
      </div>
    </div>
  )
}

export default App
