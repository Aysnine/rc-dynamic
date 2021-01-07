import { FC } from 'react'
import { BaseProps } from '../../'

const Text: FC<BaseProps> = ({ node }) => <div style={{ padding: '5px' }}>{node.meta.value || '[empty]'}</div>

export default Text
