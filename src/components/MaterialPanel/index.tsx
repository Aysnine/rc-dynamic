import { useMemo } from 'react'
import classNames from 'classnames'
import { ReactSortable } from 'react-sortablejs'
import { DynamicMode, SortableGroup } from '../../constants'
import { SortableNode } from '../../types'
import presets from './presets'

import styles from './index.module.css'
import { indexNodeMeta } from 'src/utils'

interface MaterialPanelProps {
  mode: DynamicMode
  setMode: (mode: DynamicMode) => void
}

const MaterialPanel: React.FC<MaterialPanelProps> = ({ mode, setMode }) => {
  // * for control draggable
  const handleClassName = useMemo(() => (mode === DynamicMode.CREATIVE ? styles.handle : ''), [mode])

  const list: SortableNode[] = useMemo(
    () =>
      presets.map((i) => {
        const meta = indexNodeMeta(i.clone())
        return {
          id: meta.__uid!,
          meta,
          clone: (): SortableNode => {
            const meta = indexNodeMeta(i.clone())
            return { id: meta.__uid!, meta: indexNodeMeta(i.clone()) }
          },
        }
      }),
    []
  )

  return (
    <div>
      <div className={styles.controls}>
        {mode === DynamicMode.SURVIVAL && (
          <button style={{ width: '100%', padding: '5px 0' }} onClick={() => setMode(DynamicMode.CREATIVE)}>
            Survival Mode
          </button>
        )}
        {mode === DynamicMode.CREATIVE && (
          <button style={{ width: '100%', padding: '5px 0' }} onClick={() => setMode(DynamicMode.SURVIVAL)}>
            Creative Mode
          </button>
        )}
      </div>
      <div className={styles.divider}></div>
      <ReactSortable<SortableNode>
        list={list}
        setList={() => {}}
        animation={150}
        sort={false}
        swapThreshold={1}
        group={{ name: SortableGroup.MaterialPanel, pull: 'clone', put: false }}
        className={styles.container}
        handle={'.' + handleClassName}
      >
        {presets.map((i) => (
          <div key={i.label} className={classNames(styles.item, handleClassName)}>
            {i.label}
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}

export default MaterialPanel
