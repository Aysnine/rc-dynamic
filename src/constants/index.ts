import React from 'react'
import { ConfigureProps } from '../types'

import RootContainer from '../components/RootContainer'
import FlexContainer from '../components/FlexContainer'
import Text from '../components/Text'

import DefaultConfigure from '../components/DefaultConfigure'
import FlexContainerConfigure from '../components/FlexContainerConfigure'

export enum DynamicMode {
  SURVIVAL = 'SURVIVAL',
  CREATIVE = 'CREATIVE',
}

export enum SortableGroup {
  MaterialPanel = 'MaterialPanel',
  FlexContainer = 'FlexContainer',
  RootContainer = 'RootContainer',
}

export const componentMap = {
  RootContainer,
  FlexContainer,
  Text,
}

export const defaultConfigure = DefaultConfigure
export const configureMap: Record<keyof typeof componentMap | string, React.FC<ConfigureProps<any>>> = {
  FlexContainer: FlexContainerConfigure,
}
