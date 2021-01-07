import { FC } from 'react'
import { BaseProps } from '../../'

export interface TextMeta {
  value?: string
}

const Text: FC<BaseProps<TextMeta>> = ({ meta }) => <div style={{ padding: '5px' }}>{meta?.value || '[empty]'}</div>

export default Text
