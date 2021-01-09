import { DynamicTreeNode } from './components'

export const mockTree: DynamicTreeNode[] = [
  {
    id: '1',
    component: 'container',
    children: [
      { id: '2', component: 'text', meta: { value: 'hello' } },
      { id: '4', component: 'lineChart' },
      {
        id: '5',
        component: 'container',
        meta: { direction: 'horizontal' },
        children: [
          { id: '6', component: 'text' },
          { id: '7', component: 'text', meta: { value: '' } },
        ],
      },
      { id: '3', component: 'text' },
    ],
  },
]

export const complexTree: DynamicTreeNode[] = [
  { id: '1', component: 'text', meta: { value: 'header', size: '1.5em' } },
  {
    id: '2',
    component: 'container',
    meta: { direction: 'horizontal' },
    children: [
      { id: '3', component: 'gaugeChart' },
      {
        id: '4',
        component: 'text',
        meta: { size: '1.5em', value: 'Hello DnD' },
      },
      { id: '5', component: 'gaugeChart' },
    ],
  },
  {
    id: '6',
    component: 'container',
    children: [
      { id: '16', component: 'lineChart' },
      { id: '7', component: 'sunburstChart' },
    ],
    meta: { direction: 'horizontal' },
  },
  {
    id: '17',
    component: 'container',
    children: [
      { id: '8', component: 'gaugeChart' },
      { id: '9', component: 'text' },
      { id: '10', component: 'text' },
      {
        id: '11',
        component: 'container',
        children: [
          {
            id: '12',
            component: 'text',
            meta: { value: '' },
          },
          { id: '13', component: 'text' },
          { id: '14', component: 'text' },
        ],
      },
    ],
    meta: { direction: 'horizontal' },
  },
  { id: '15', component: 'text', meta: { value: 'footer' } },
]
