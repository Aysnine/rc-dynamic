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
    config: { value: 'hello' },
    children: [
      { id: '2', component: 'text', config: {} },
      {
        id: '5',
        component: 'container',
        config: { value: 'hello' },
        children: [
          { id: '6', component: 'text', config: {} },
          { id: '7', component: 'text', config: { value: '' } },
        ],
      },
      { id: '3', component: 'text', config: { value: 'hello' } },
    ],
  },
]
