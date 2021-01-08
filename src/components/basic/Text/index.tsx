import { FC } from 'react'
import { BaseProps } from '../../'

export interface TextMeta {
  value?: string
}

const Text: FC<BaseProps<TextMeta>> = ({ meta }) => <div>{meta?.value || '[empty]'}</div>

export default Text
