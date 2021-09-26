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
          config: { direction: 'row', fixedNestedChildren: true },
          children: [
            {
              component: 'FlexContainer',
              config: { direction: 'vertical', fixedNestedChildren: true },
              children: [
                { component: 'FlexContainer', config: { direction: 'column' } },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
              ],
            },
            {
              component: 'FlexContainer',
              config: { direction: 'vertical', fixedNestedChildren: true },
              children: [
                { component: 'FlexContainer', config: { direction: 'column' } },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  children: [{ component: 'Text', config: { content: 'Hello' } }],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
