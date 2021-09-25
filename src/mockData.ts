import { DynamicRootMeta } from './types'

export const mockMetaTree: DynamicRootMeta = {
  version: '0',
  children: [
    {
      component: 'FlexContainer',
      config: { root: true },
      children: [
        { component: 'FlexContainer', children: [] },
        {
          component: 'FlexContainer',
          children: [{ component: 'Text', config: { content: 'Text A' } }],
        },
        {
          component: 'FlexContainer',
          children: [
            { component: 'Text', config: { content: 'Text B' } },
            { component: 'Text', config: { content: 'Text D' } },
            { component: 'Text', config: { content: 'Text C' } },
          ],

          config: { direction: 'horizontal' },
        },
        {
          component: 'FlexContainer',
          config: { direction: 'row' },

          children: [
            {
              component: 'FlexContainer',
              config: { direction: 'vertical' },

              children: [
                {
                  component: 'FlexContainer',
                  config: { direction: 'column' },

                  children: [
                    { component: 'Text', config: { content: 'Hello' } },
                    { component: 'Text', config: { content: '中文' } },
                  ],
                },
                { component: 'Text', config: { content: 'Hello' } },
                { component: 'Text', config: { content: '中文' } },
              ],
            },
            {
              component: 'FlexContainer',
              config: { direction: 'vertical' },

              children: [
                { component: 'FlexContainer', config: { direction: 'row' } },
                { component: 'FlexContainer', config: { direction: 'column' } },
                { component: 'Text', config: { content: 'Hello' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
