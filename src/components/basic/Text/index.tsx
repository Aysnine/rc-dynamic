import { FC } from 'react'
import { BaseProps } from '../../'

export enum TextSize {
  SMALL = '.8em',
  NORMAL = '1em',
  LARGE = '1.5em',
}

export interface TextMeta {
  value?: string
  size?: TextSize
}

export const defaults: TextMeta = {
  value: '',
  size: TextSize.NORMAL,
}

const Text: FC<BaseProps<TextMeta>> = ({ meta }) => {
  const size = meta?.size ?? defaults.size

  return (
    <div className="text" style={{ fontSize: size }}>
      {meta?.value}
    </div>
  )
}

export default Text
