import { FC } from 'react'

export enum TextSize {
  SMALL = '.8em',
  NORMAL = '1em',
  LARGE = '1.5em',
}

export interface TextProps {
  value?: string
  size?: TextSize
}

export const defaults: TextProps = {
  value: '',
  size: TextSize.NORMAL,
}

const Text: FC<TextProps> = ({ value = '', size = defaults.size }) => {
  return (
    <div className="text" style={{ fontSize: size }}>
      {value}
    </div>
  )
}

export default Text
