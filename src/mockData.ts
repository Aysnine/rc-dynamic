import { DynamicTreeNode } from './components'

export const simpleMockTree: DynamicTreeNode[] = [
  {
    uid: 'c',
    component: 'container',
    children: [
      { uid: 't1', component: 'text' },
      { uid: 't2', component: 'text' },
    ],
  },
]

export const mockTree: DynamicTreeNode[] = [
  {
    uid: '1',
    component: 'container',
    config: { foo: 1 },
    children: [
      { uid: '2', component: 'text', config: {} },
      {
        uid: '5',
        component: 'container',
        config: { foo: 1 },
        children: [
          { uid: '6', component: 'text', config: {} },
          { uid: '7', component: 'text', config: { foo: 4 } },
        ],
      },
      { uid: '3', component: 'text', config: { foo: 4 } },
    ],
  },
]
