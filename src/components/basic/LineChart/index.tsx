import { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { useEffectOnce, useMount, useWindowSize } from 'react-use'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'
import { BaseProps } from '../../'

const defaultOption: EChartsOption = {
  title: {
    text: 'line chart',
  },
  legend: {
    data: ['销量'],
  },
  xAxis: {
    data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
  },
  yAxis: {},
  series: [
    {
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 20],
    },
  ],
}

export interface LineChartMeta {
  value?: string
}

const LineChart: FC<BaseProps<LineChartMeta>> = () => {
  const container = useRef<HTMLDivElement>(null)
  const chart = useRef<ReturnType<typeof echarts.init> | null>()

  useMount(() => {
    chart.current?.resize()
  })

  useLayoutEffect(() => {
    chart.current?.resize()
  })

  const windowSize = useWindowSize()
  useEffect(() => {
    chart.current?.resize()
  }, [windowSize.width, windowSize.height])

  useEffectOnce(() => {
    if (container.current) {
      chart.current = echarts.init(container.current)
      chart.current.setOption(defaultOption)
    }
  })

  return <div ref={container} style={{ height: '300px', overflow: 'hidden' }}></div>
}

export default LineChart
