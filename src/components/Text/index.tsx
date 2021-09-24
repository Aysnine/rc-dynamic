export interface TextProps {
  content?: string
}

const Text: React.FC<TextProps> = ({ content }) => {
  return <div>{content || 'Text'}</div>
}

export default Text
