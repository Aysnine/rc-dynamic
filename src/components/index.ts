import { Dispatch, FC, RefObject, SetStateAction } from 'react'
import { Store } from 'react-sortablejs'
import Container from './basic/Container'
import ContainerConfigure from './basic/Container/components/Configure'
import GaugeChart from './basic/GaugeChart'
import GaugeChartConfigure from './basic/GaugeChart/components/Configure'
import LineChart from './basic/LineChart'
import LineChartConfigure from './basic/LineChart/components/Configure'
import SunburstChart from './basic/SunburstChart'
import SunburstChartConfigure from './basic/SunburstChart/components/Configure'
import Text from './basic/Text'
import TextConfigure from './basic/Text/components/Configure'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
  lineChart: LineChart,
  gaugeChart: GaugeChart,
  sunburstChart: SunburstChart,
}

export type ComponentKey = keyof typeof DynamicComponentMap

export const ConfigureMap: Record<ComponentKey, FC<BaseProps>> = {
  text: TextConfigure,
  container: ContainerConfigure,
  lineChart: LineChartConfigure,
  gaugeChart: GaugeChartConfigure,
  sunburstChart: SunburstChartConfigure,
}

export interface DynamicTreeNode<M = any> {
  id: string
  component: ComponentKey
  meta?: M
  children?: DynamicTreeNode[]

  // ! by sortable runtime, need clean
  // ! https://github.com/SortableJS/react-sortablejs#list
  selected?: boolean
  chosen?: boolean
  filtered?: boolean
}

export interface BaseProps<M = any> {
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: Dispatch<SetStateAction<DynamicTreeNode[]>>
  setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void
  meta?: M
  setMeta: (newMeta: M) => void
  activeId: string
  setActiveId: Dispatch<SetStateAction<string>>
  panel: RefObject<HTMLDivElement>
  update: () => void
  remove: () => void
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
