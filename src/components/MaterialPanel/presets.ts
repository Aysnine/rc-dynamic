import { DynamicNodeMeta } from '../../types'

const presets: { label: string; clone: () => DynamicNodeMeta }[] = [
  {
    label: 'FlexContainer | Vertical',
    clone: () => ({
      component: 'FlexContainer',
      config: {
        direction: 'vertical',
      },
    }),
  },
  {
    label: 'FlexContainer | Horizontal',
    clone: () => ({
      component: 'FlexContainer',
      config: {
        direction: 'horizontal',
      },
    }),
  },
  {
    label: 'Text | Hello',
    clone: () => ({ component: 'Text', config: { content: 'Hello' } }),
  },
  {
    label: 'Text | 中文',
    clone: () => ({ component: 'Text', config: { content: '中文' } }),
  },
]

export default presets
