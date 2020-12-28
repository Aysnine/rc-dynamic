import { useCallback } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { useTreeData } from '@react-stately/data'
import { DynamicTreeNode } from './types'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'

const App = () => {
  const tree = useTreeData<DynamicTreeNode>({
    getKey: (i) => i.uid,
    getChildren: (i) => i.children || [],
    initialItems: [{
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
            { uid: '7', component: 'text', config: { foo: 4 } }
          ]
        },
        { uid: '3', component: 'text', config: { foo: 4 } }
      ]
    }]
  })

  const handleLayoutChange = useCallback(async (result: DropResult, provided: ResponderProvided) => {
    console.log(result)

    const { destination, draggableId, combine } = result
    if (destination) {
      tree.move(draggableId, destination.droppableId, destination.index)
    } else if (combine) {
      tree.move(draggableId, combine.draggableId, 0)
    }
  }, [])

  return (
    <div>
      <DragDropContext onDragEnd={handleLayoutChange}>
        <DynamicTreeRootComponent tree={tree} />
      </DragDropContext>
    </div>
  )
}

export default App
