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
  {
    id: '1',
    component: 'text',
    meta: { value: 'header', size: '1.5em' },
  },
  {
    id: '2',
    component: 'container',
    meta: { direction: 'horizontal' },
    children: [
      { id: '6', component: 'text' },
      { id: '3', component: 'text' },
      { id: '7', component: 'text', meta: { value: '' } },
    ],
  },
  { id: '4', component: 'lineChart' },
  {
    id: '5',
    component: 'container',
    children: [
      { id: '8', component: 'lineChart' },
      {
        id: '9',
        component: 'container',

        children: [
          { id: '10', component: 'text' },
          { id: '11', component: 'text' },
          { id: '12', component: 'text' },
        ],
      },
    ],
    meta: { direction: 'horizontal' },
  },
  { id: '13', component: 'text', meta: { value: 'footer' } },
]
