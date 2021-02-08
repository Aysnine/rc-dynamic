import { createContext, Dispatch, FC, RefObject, SetStateAction, useCallback } from 'react'
import { Store } from 'react-sortablejs'
import { useUpdate } from 'react-use'
import { clone } from 'ramda'
import { ConfigureMap, DynamicComponentMap, Mode } from '..'
import { TreeNodeProvideData, DynamicTreeNode } from '..'
import ConfigureWrapper from './ConfigureWrapper'

export const TreeNodeContext = createContext<TreeNodeProvideData>({} as TreeNodeProvideData)
export const getUUID = () => Math.random().toString().slice(2)

const TreeNode: FC<{
  node: DynamicTreeNode
  index: number
  indexPath: number[]
  setTree: Dispatch<SetStateAction<DynamicTreeNode[]>>
  activeId: string
  setActiveId: Dispatch<SetStateAction<string>>
  panel: RefObject<HTMLDivElement>
  mode: Mode
}> = ({ node, index, setTree, indexPath, activeId, setActiveId, mode, panel }) => {
  const Comp = DynamicComponentMap[node.component]
  const CompConfigure = ConfigureMap[node.component]

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

  const duplicate = useCallback(() => {
    setTree((sourceNodes) => {
      const tempNodes = [...sourceNodes]
      const _nodeIndex = [...indexPath]
      const lastIndex = _nodeIndex.pop() || 0
      const lastArr = _nodeIndex.reduce((arr, i) => arr[i]['children'] || [], tempNodes)
      const cloneItem = clone(lastArr[lastIndex])
      const revRenewId = (i: typeof cloneItem): typeof cloneItem => {
        i.id = getUUID()
        i.children?.map((i) => revRenewId(i))
        return i
      }
      lastArr.splice(lastIndex + 1, 0, revRenewId(cloneItem))
      return tempNodes
    })
  }, [indexPath, setTree])

  const provideData: TreeNodeProvideData = {
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
    duplicate,
    inactive,
    applyMeta,
    mode,
  }

  const handleActive = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      event.stopPropagation() // ! for child active
      setActiveId(node.id)
    },
    [node.id, setActiveId]
  )

  const active = activeId === node.id

  const comp = (
    <TreeNodeContext.Provider value={provideData}>
      <Comp>
        {node.children?.map((childNode, index) => (
          <TreeNode
            key={childNode.id}
            node={childNode}
            index={index}
            indexPath={[...indexPath, index]}
            setTree={setTree}
            activeId={activeId}
            setActiveId={setActiveId}
            panel={panel}
            mode={mode}
          />
        ))}
      </Comp>
    </TreeNodeContext.Provider>
  )

  if (mode === Mode.RUNTIME) {
    return <div className="tree-node-wrapper">{comp}</div>
  }

  if (mode === Mode.CREATIVE) {
    return (
      <div className={`tree-node-wrapper ${active ? 'active' : ''}`} onClick={handleActive}>
        {comp}
        {active && (
          <TreeNodeContext.Provider value={provideData}>
            <ConfigureWrapper>
              <CompConfigure />
            </ConfigureWrapper>
          </TreeNodeContext.Provider>
        )}
      </div>
    )
  }

  return null
}

export default TreeNode
