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
          config: { direction: 'vertical', fixedChildren: true },
          __uid: '37',
          children: [
            {
              component: 'FlexContainer',
              config: { direction: 'horizontal' },
              __uid: '38',
              children: [{ component: 'Text', config: { content: 'Hello' }, __uid: '41' }],
            },
            {
              component: 'FlexContainer',
              config: { direction: 'horizontal' },
              __uid: '39',
              children: [
                { component: 'Text', config: { content: 'Hello' }, __uid: '43' },
                { component: 'Text', config: { content: 'Hello' }, __uid: '42' },
              ],
            },
            {
              component: 'FlexContainer',
              config: { direction: 'horizontal', fixedChildren: true },
              __uid: '40',
              children: [
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  __uid: '52',
                  children: [{ component: 'Text', config: { content: '中文' }, __uid: '46' }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  __uid: '55',
                  children: [{ component: 'Text', config: { content: '中文' }, __uid: '56' }],
                },
                {
                  component: 'FlexContainer',
                  config: { direction: 'vertical' },
                  __uid: '53',
                  children: [{ component: 'Text', config: { content: '中文' }, __uid: '54' }],
                },
              ],
            },
          ],
        },
        {
          component: 'FlexContainer',
          config: { direction: 'horizontal' },
          __uid: '47',
          children: [
            { component: 'Text', config: { content: '中文' }, __uid: '57' },
            { component: 'Text', config: { content: 'Hello' }, __uid: '51' },
            { component: 'Text', config: { content: '中文' }, __uid: '49' },
            { component: 'Text', config: { content: '中文' }, __uid: '50' },
          ],
        },
      ],
      __uid: '0',
    },
  ],
}
