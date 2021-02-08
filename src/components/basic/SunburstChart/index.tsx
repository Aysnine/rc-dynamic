import { FC, useEffect, useLayoutEffect, useRef } from 'react'
import { useEffectOnce, useMount, useWindowSize } from 'react-use'
import * as echarts from 'echarts'
import { mockOption } from './mockData'

export interface Props {
  value?: string
}

const Sunburst: FC<Props> = () => {
  const container = useRef<HTMLDivElement>(null)
  const chart = useRef<ReturnType<typeof echarts.init>>()

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
      chart.current.setOption(mockOption)
    }
  })

  return <div ref={container} style={{ height: '300px', overflow: 'hidden' }}></div>
}

export default Sunburst
