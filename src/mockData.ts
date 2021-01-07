import { DynamicTreeNode } from './components'

export const simpleMockTree: DynamicTreeNode[] = [
  {
    id: 'c',
    component: 'container',
    children: [
      { id: 't1', component: 'text' },
      { id: 't2', component: 'text' },
    ],
  },
]

export const mockTree: DynamicTreeNode[] = [
  {
    id: '1',
    component: 'container',
    meta: { value: 'hello' },
    children: [
      { id: '2', component: 'text', meta: {} },
      {
        id: '5',
        component: 'container',
        meta: { value: 'hello' },
        children: [
          { id: '6', component: 'text', meta: {} },
          { id: '7', component: 'text', meta: { value: '' } },
        ],
      },
      { id: '3', component: 'text', meta: { value: 'hello' } },
    ],
  },
]
