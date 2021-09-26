import { MaterialSortableNodeMeta } from '.'

const components: MaterialSortableNodeMeta[] = [
  {
    id: 'material__FlexContainer__Vertical',
    label: 'FlexContainer | Vertical',
    cloneRaw: () => ({
      component: 'FlexContainer',
      config: {
        direction: 'vertical',
      },
    }),
  },
  {
    id: 'material__FlexContainer__Horizontal',
    label: 'FlexContainer | Horizontal',
    cloneRaw: () => ({
      component: 'FlexContainer',
      config: {
        direction: 'horizontal',
      },
    }),
  },
  {
    id: 'material__Text__Hello',
    label: 'Text | Hello',
    cloneRaw: () => ({ component: 'Text', config: { content: 'Hello' } }),
  },
  {
    id: 'material__Text__中文',
    label: 'Text | 中文',
    cloneRaw: () => ({ component: 'Text', config: { content: '中文' } }),
  },
]

export default components
