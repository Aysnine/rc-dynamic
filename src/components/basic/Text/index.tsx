import { FC } from 'react'
import { DynamicComponentBaseProps } from '../../../types'

const Text: FC<DynamicComponentBaseProps> = ({ node }) => (
  <div style={{ backgroundColor: 'lightblue', padding: '10px' }}>【{node.key}】element</div>
)

export default Text
