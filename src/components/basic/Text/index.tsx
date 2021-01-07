import { FC } from 'react'
import { DynamicComponentBaseProps } from '../../'

const Text: FC<DynamicComponentBaseProps> = ({ node }) => (
  <div style={{ padding: '5px' }}>{node.meta.value || '[empty]'}</div>
)

export default Text
