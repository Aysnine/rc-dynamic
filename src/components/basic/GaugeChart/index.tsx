import { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { useEffectOnce, useMount, useWindowSize } from 'react-use'
import * as echarts from 'echarts'
import { EChartsOption } from 'echarts'

const defaultOption: EChartsOption = {
  series: [
    {
      type: 'gauge',
      progress: {
        show: true,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        show: false,
      },
      pointer: {
        show: false,
      },
      anchor: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        offsetCenter: [0, '-15%'],
      },
      data: [
        {
          name: 'CPU',
          value: 70,
        },
      ],
    },
  ],
}

export interface GaugeChartProps {
  value?: string
}

const GaugeChart: FC<GaugeChartProps> = () => {
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

  return <div ref={container} style={{ height: '160px', overflow: 'hidden' }}></div>
}

export default GaugeChart
