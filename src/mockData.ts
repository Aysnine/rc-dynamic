import { DynamicRootMeta } from './types'

export const mockMetaTree: DynamicRootMeta = {
  version: '0',
  children: [
    {
      component: 'FlexContainer',
      config: { root: true },
      children: [
        {
          component: 'FlexContainer',
          config: { direction: 'vertical', fixedNestedChildren: true },
          __dynamic_uid: '37',
          children: [
            {
              component: 'FlexContainer',
              config: { direction: 'horizontal' },
              __dynamic_uid: '38',
              children: [{ component: 'Text', config: { content: 'Hello' }, __dynamic_uid: '41' }],
            },
            {
              component: 'FlexContainer',
              config: { direction: 'horizontal' },
              __dynamic_uid: '39',
              children: [
                { component: 'Text', config: { content: 'Hello' }, __dynamic_uid: '43' },
                { component: 'Text', config: { content: 'Hello' }, __dynamic_uid: '42' },
              ],
            },
            {
              component: 'FlexContainer',
              config: { direction: 'horizontal', fixedNestedChildren: true },
              __dynamic_uid: '40',
              children: [
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  __dynamic_uid: '52',
                  children: [{ component: 'Text', config: { content: '中文' }, __dynamic_uid: '46' }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  __dynamic_uid: '55',
                  children: [{ component: 'Text', config: { content: '中文' }, __dynamic_uid: '56' }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  __dynamic_uid: '53',
                  children: [{ component: 'Text', config: { content: '中文' }, __dynamic_uid: '54' }],
                },
              ],
            },
          ],
        },
        {
          component: 'FlexContainer',
          config: { direction: 'horizontal' },
          __dynamic_uid: '47',
          children: [
            { component: 'Text', config: { content: '中文' }, __dynamic_uid: '57' },
            { component: 'Text', config: { content: 'Hello' }, __dynamic_uid: '51' },
            { component: 'Text', config: { content: '中文' }, __dynamic_uid: '49' },
            { component: 'Text', config: { content: '中文' }, __dynamic_uid: '50' },
          ],
        },
      ],
      __dynamic_uid: '0',
    },
  ],
}
