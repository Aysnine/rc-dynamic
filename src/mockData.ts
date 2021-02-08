import { DynamicTreeNode } from './components'

export const mockTree: DynamicTreeNode[] = [
  { id: '1', component: 'text', meta: { raw: { value: 'header', size: '1.5em' } } },
  {
    id: '2',
    component: 'container',
    meta: { raw: { direction: 'horizontal' } },
    children: [
      { id: '3', component: 'gaugeChart' },
      {
        id: '4',
        component: 'text',
        meta: { raw: { size: '1.5em', value: 'Hello DnD' } },
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
    meta: { raw: { direction: 'horizontal' } },
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
            meta: { raw: { value: '' } },
          },
          { id: '13', component: 'text' },
          { id: '14', component: 'text' },
        ],
      },
    ],
    meta: { raw: { direction: 'horizontal' } },
  },
  { id: '15', component: 'text', meta: { raw: { value: 'footer' } } },
]
