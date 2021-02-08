import { Dispatch, RefObject, SetStateAction, useState } from 'react'
import { Store } from 'react-sortablejs'
import Container from './basic/Container'
import GaugeChart from './basic/GaugeChart'
import LineChart from './basic/LineChart'
import SunburstChart from './basic/SunburstChart'
import Text from './basic/Text'
import { HookComposeMeta } from './core/HookCompose'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
  lineChart: LineChart,
  gaugeChart: GaugeChart,
  sunburstChart: SunburstChart,
}

export type ComponentKey = keyof typeof DynamicComponentMap

export const HookMap: Record<string, Function> = { useState }
export type HookMapKey = keyof typeof HookMap

export interface DynamicTreeNode {
  id: string
  component: ComponentKey
  meta?: TreeNodeMeta
  children?: DynamicTreeNode[]

  // ! by sortable runtime, need clean
  // ! https://github.com/SortableJS/react-sortablejs#list
  selected?: boolean
  chosen?: boolean
  filtered?: boolean
}

export interface TreeNodeMeta {
  raw?: any
  hookCompose?: HookComposeMeta
}

export interface TreeNodeProvideData {
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: Dispatch<SetStateAction<DynamicTreeNode[]>>
  setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void
  meta?: TreeNodeMeta
  setMeta: (newMeta: TreeNodeMeta) => void
  activeId: string
  setActiveId: Dispatch<SetStateAction<string>>
  panel: RefObject<HTMLDivElement>
  update: () => void
  remove: () => void
  duplicate: () => void
  inactive: () => void
  applyMeta: () => void
  mode: Mode
}

export const normalSortableOptions = {
  animation: 150,
  fallbackOnBody: true,
  swapThreshold: 0.65,
  ghostClass: 'ghost',
  group: 'shared',
  style: { overflow: 'auto' },
}

export enum Mode {
  CREATIVE = 'CREATIVE',
  RUNTIME = 'RUNTIME',
}
