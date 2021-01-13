import { Dispatch, FC, RefObject, SetStateAction, useCallback } from 'react'
import { Store } from 'react-sortablejs'
import { useUpdate } from 'react-use'
import { ConfigureMap, DynamicComponentMap } from '..'
import { BaseProps, DynamicTreeNode } from '..'
import ConfigureWrapper from './ConfigureWrapper'

const DynamicTreeNodeComponent: FC<{
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: Dispatch<SetStateAction<DynamicTreeNode[]>>
  activeId: string
  setActiveId: Dispatch<SetStateAction<string>>
  panel: RefObject<HTMLDivElement>
}> = ({ node, index, setTree, indexPath, activeId, setActiveId, panel }) => {
  const Comp: FC<BaseProps> = DynamicComponentMap[node.component]
  const CompConfigure: FC<BaseProps> = ConfigureMap[node.component]

  const setCurrentTree: (newState: DynamicTreeNode[], sortable: any, store: Store) => void = useCallback(
    (currentNodes) => {
      setTree((sourceNodes) => {
        const tempNodes = [...sourceNodes]
        const _nodeIndex = [...indexPath]
        const lastIndex = _nodeIndex.pop() || 0
        const lastArr = _nodeIndex.reduce((arr, i) => arr[i]['children'] || [], tempNodes)
        lastArr[lastIndex]['children'] = currentNodes
        return tempNodes
      })
    },
    [indexPath, setTree]
  )

  const update = useUpdate()

  const setMeta = useCallback(
    (newMeta: DynamicTreeNode['meta']) => {
      node.meta = newMeta
      update()
    },
    [node, update]
  )

  const applyMeta = useCallback(() => {
    setTree((sourceNodes) => [...sourceNodes])
  }, [setTree])

  const inactive = useCallback(() => {
    setActiveId('')
  }, [setActiveId])

  const remove = useCallback(() => {
    setTree((sourceNodes) => {
      const tempNodes = [...sourceNodes]
      const _nodeIndex = [...indexPath]
      const lastIndex = _nodeIndex.pop() || 0
      const lastArr = _nodeIndex.reduce((arr, i) => arr[i]['children'] || [], tempNodes)
      lastArr.splice(lastIndex, 1)
      return tempNodes
    })
    inactive()
  }, [inactive, indexPath, setTree])

  const compProps: BaseProps = {
    node,
    index,
    setTree,
    setCurrentTree,
    indexPath,
    activeId,
    setActiveId,
    setMeta,
    meta: node.meta,
    panel,
    update,
    remove,
    inactive,
    applyMeta,
  }

  const handleActive = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation() // ! for child active
      setActiveId(node.id)
    },
    [node.id, setActiveId]
  )

  const active = activeId === node.id

  return (
    <div className={`tree-node-wrapper ${active ? 'active' : ''}`} onClick={handleActive}>
      <Comp key={node.id} {...compProps} />
      {active && (
        <ConfigureWrapper {...compProps}>
          <CompConfigure key={node.id} {...compProps} />
        </ConfigureWrapper>
      )}
    </div>
  )
}

export default DynamicTreeNodeComponent
