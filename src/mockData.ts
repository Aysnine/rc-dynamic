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
