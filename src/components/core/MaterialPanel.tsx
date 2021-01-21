import { FC, useState } from 'react'
import { ReactSortable } from 'react-sortablejs'
import { DynamicTreeNode, normalSortableOptions } from '..'
import { getUUID } from './TreeNode'

const all: DynamicTreeNode[] = [
  { id: getUUID(), component: 'container' },
  { id: getUUID(), component: 'text' },
  { id: getUUID(), component: 'lineChart' },
  { id: getUUID(), component: 'gaugeChart' },
  { id: getUUID(), component: 'sunburstChart' },
]

const clone = (item: DynamicTreeNode) => ({ ...item, id: getUUID() })

const MaterialPanel: FC = () => {
  const [components, setComponents] = useState<DynamicTreeNode[]>(all)
  return (
    <ReactSortable
      {...normalSortableOptions}
      list={components}
      setList={setComponents}
      group={{ name: 'shared', pull: 'clone', put: false }}
      sort={false}
      clone={clone}
      style={undefined} // TODO remove
    >
      <div className="component-item-wrapper">Container</div>
      <div className="component-item-wrapper">Text</div>
      <div className="component-item-wrapper">LineChart</div>
      <div className="component-item-wrapper">GaugeChart</div>
      <div className="component-item-wrapper">SunburstChart</div>
    </ReactSortable>
  )
}

export default MaterialPanel
