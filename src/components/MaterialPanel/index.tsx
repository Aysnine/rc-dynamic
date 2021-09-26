import { useMemo } from 'react'
import classNames from 'classnames'
import { ReactSortable } from 'react-sortablejs'
import { DynamicMode } from '../../constants'
import { DynamicNodeMeta } from '../../types'
import { sortableGroupName, SortableNodeMeta } from '../FlexContainer'
import components from './components'

import styles from './index.module.css'

export interface MaterialSortableNodeMeta extends Omit<SortableNodeMeta, 'raw'> {
  label: string
  cloneRaw: () => DynamicNodeMeta
}

export const isMaterialSortableNodeMeta = (meta: unknown): meta is MaterialSortableNodeMeta => {
  return typeof (meta as MaterialSortableNodeMeta).cloneRaw === 'function'
}

interface MaterialPanelProps {
  mode: DynamicMode
  setMode: (mode: DynamicMode) => void
}

const MaterialPanel: React.FC<MaterialPanelProps> = ({ mode, setMode }) => {
  // * for control draggable
  const handleClassName = useMemo(() => (mode === DynamicMode.CREATIVE ? styles.handle : ''), [mode])

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
      <ReactSortable<MaterialSortableNodeMeta>
        list={components}
        setList={() => {}}
        animation={150}
        sort={false}
        swapThreshold={1}
        group={{ name: sortableGroupName, pull: 'clone', put: false }}
        className={styles.container}
        ghostClass={styles.ghost}
        handle={'.' + handleClassName}
        tag="div"
      >
        {components.map((i) => (
          <div key={i.id} className={classNames(styles.item, handleClassName)}>
            {i.label}
          </div>
        ))}
      </ReactSortable>
    </div>
  )
}

export default MaterialPanel
