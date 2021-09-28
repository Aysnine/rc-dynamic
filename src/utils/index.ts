import { DynamicNodeMeta, DynamicRootMeta } from '../types'

export const uid = (() => {
  let i = 0
  return () => String(i++)
})()

export const indexChildrenMeta = (children?: DynamicNodeMeta[]): DynamicNodeMeta[] | undefined =>
  children?.map((child) => ({
    ...child,
    __uid: uid(),
    children: indexChildrenMeta(child.children),
  }))

export const indexNodeMeta = (nodeMeta: DynamicNodeMeta): DynamicNodeMeta =>
  [nodeMeta].map((child) => ({
    ...child,
    __uid: uid(),
    children: indexChildrenMeta(child.children),
  }))[0]

export const cloneNodeMeta = (nodeMeta: DynamicNodeMeta): DynamicNodeMeta =>
  [JSON.parse(JSON.stringify(nodeMeta))].map((child) => ({
    ...child,
    __uid: uid(),
    children: indexChildrenMeta(child.children),
  }))[0]

export const indexRootMeta = (meta: DynamicRootMeta): DynamicRootMeta => {
  return {
    ...meta,
    children: indexChildrenMeta(meta.children),
  }
}

export const findCurrentMeta = (rootMeta: DynamicRootMeta, indexPath: number[]): DynamicNodeMeta | undefined => {
  const { last } = indexPath.reduce(
    ({ next = [] }, index) => ({
      last: next[index],
      next: next[index]?.children ?? [],
    }),
    {
      next: rootMeta.children,
      last: undefined,
    } as { next?: DynamicNodeMeta[]; last?: DynamicNodeMeta }
  )

  return last
}

export const findParentMeta = (rootMeta: DynamicRootMeta, indexPath: number[]): DynamicNodeMeta | undefined => {
  const last = findCurrentMeta(rootMeta, indexPath.slice(0, -1))
  return last
}

export const hashChildrenIds = (children: DynamicNodeMeta[] = []) => {
  return children.map((i) => i.__uid).join('__')
}

export const equalChildrenIds = (A: DynamicNodeMeta[] = [], B: DynamicNodeMeta[] = []) => {
  return hashChildrenIds(A) === hashChildrenIds(B)
}
