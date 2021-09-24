import produce from 'immer'
import React, { createContext, useEffect, useState } from 'react'
import { DynamicRootMeta } from '../../../types'
import DynamicChildren from '../DynamicChildren'
import { DynamicMode } from '../../../constants'

export interface DynamicRootProps {
  value: DynamicRootMeta
  onChange: (value: DynamicRootMeta) => void
  mode: DynamicMode
}

export const DynamicRootContext = createContext<{
  meta?: DynamicRootMeta
  updateMeta?: (callback: (mete: DynamicRootMeta) => void) => void
  mode: DynamicMode
  activeId: string | null
  setActiveId: React.Dispatch<React.SetStateAction<string | null>>
}>({
  mode: DynamicMode.SURVIVAL,
  activeId: null,
  setActiveId: () => {},
})

const DynamicRoot: React.FC<DynamicRootProps> = ({ value, onChange, mode }) => {
  const meta = value

  const [activeId, setActiveId] = useState<string | null>(null)
  // const [activeId, setActiveId] = useState<string | null>('4') // ! DEBUG

  useEffect(() => {
    if (mode === DynamicMode.SURVIVAL) {
      setActiveId(null)
    }
  }, [mode])

  const updateMeta = (callback: (mete: DynamicRootMeta) => void) => {
    onChange(
      produce(meta, (draft) => {
        callback(draft)
      })
    )
  }

  return (
    <DynamicRootContext.Provider value={{ meta, updateMeta, mode, activeId, setActiveId }}>
      {meta.children ? <DynamicChildren children={meta.children} /> : null}
    </DynamicRootContext.Provider>
  )
}

export default DynamicRoot
