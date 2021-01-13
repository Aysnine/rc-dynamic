import { EChartsOption } from 'echarts'

const item1 = {
  color: '#3f51b5',
}
const item2 = {
  color: '#7986cb',
}
const item3 = {
  color: '#9fa8da',
}

export const mockOption: EChartsOption = {
  series: {
    radius: ['15%', '80%'],
    type: 'sunburst',
    sort: 'desc',
    emphasis: {
      focus: 'ancestor',
    },
    data: [
      {
        children: [
          {
            value: 5,
            children: [
              {
                value: 1,
                itemStyle: item1,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
              {
                children: [
                  {
                    value: 1,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
          {
            value: 10,
            children: [
              {
                value: 6,
                children: [
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                  {
                    value: 1,
                  },
                ],
                itemStyle: item3,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                  },
                ],
                itemStyle: item3,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
        ],
        itemStyle: item1,
      },
      {
        value: 9,
        children: [
          {
            value: 4,
            children: [
              {
                value: 2,
                itemStyle: item2,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                ],
              },
            ],
            itemStyle: item1,
          },
          {
            children: [
              {
                value: 3,
                children: [
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item2,
      },
      {
        value: 7,
        children: [
          {
            children: [
              {
                value: 1,
                itemStyle: item3,
              },
              {
                value: 3,
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                  {
                    value: 1,
                  },
                ],
                itemStyle: item2,
              },
              {
                value: 2,
                children: [
                  {
                    value: 1,
                  },
                  {
                    value: 1,
                    itemStyle: item1,
                  },
                ],
                itemStyle: item1,
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item1,
      },
      {
        children: [
          {
            value: 6,
            children: [
              {
                value: 1,
                itemStyle: item2,
              },
              {
                value: 2,
                children: [
                  {
                    value: 2,
                    itemStyle: item2,
                  },
                ],
                itemStyle: item1,
              },
              {
                value: 1,
                itemStyle: item3,
              },
            ],
            itemStyle: item3,
          },
          {
            value: 3,
            children: [
              {
                value: 1,
              },
              {
                children: [
                  {
                    value: 1,
                    itemStyle: item2,
                  },
                ],
              },
              {
                value: 1,
              },
            ],
            itemStyle: item3,
          },
        ],
        itemStyle: item1,
      },
    ],
    label: {
      rotate: 'radial',
    },
    levels: [],
    itemStyle: {
      color: '#ddd',
      borderWidth: 2,
    },
  },
}
