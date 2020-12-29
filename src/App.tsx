import { useCallback, useEffect } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { useTreeData } from '@react-stately/data'
import { DynamicTreeNode } from './types'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'

const App = () => {
  const tree = useTreeData<DynamicTreeNode>({
    getKey: (i) => i.uid,
    getChildren: (i) => i.children || [],
    initialItems: [
      {
        uid: '1',
        component: 'container',
        config: { foo: 1 },
        children: [
          { uid: '2', component: 'text', config: {} },
          {
            uid: '5',
            component: 'container',
            config: { foo: 1 },
            children: [
              { uid: '6', component: 'text', config: {} },
              { uid: '7', component: 'text', config: { foo: 4 } },
            ],
          },
          { uid: '3', component: 'text', config: { foo: 4 } },
        ],
      },
    ],
  })

  const handleDragEnd = useCallback(
    (result: DropResult, provided: ResponderProvided) => {
      const { destination, source, combine, draggableId } = result
      console.log(result)

      if (source) {
        if (destination) {
          if (source.droppableId === destination.droppableId) {
            console.log('sib', draggableId, destination.droppableId, destination.index)
            tree.move(draggableId, destination.droppableId, destination.index)
          }
        } else if (combine) {
          console.log('combine')
        }
      }
    },
    [tree]
  )

  useEffect(() => {
    console.log('tree changed')
  }, [tree])

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <DynamicTreeRootComponent tree={tree} />
      </DragDropContext>
    </div>
  )
}

export default App
