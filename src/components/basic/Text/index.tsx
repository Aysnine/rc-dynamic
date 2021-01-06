import { FC } from 'react'
import { DynamicComponentBaseProps } from '../../'

const Text: FC<DynamicComponentBaseProps> = ({ node }) => <div>{node.config.value || '[empty]'}</div>

export default Text
