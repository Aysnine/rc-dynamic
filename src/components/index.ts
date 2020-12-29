import Container from './basic/Container'
import Text from './basic/Text'

export const DynamicComponentMap = {
  text: Text,
  container: Container,
}

export type DynamicComponentKey = keyof typeof DynamicComponentMap
