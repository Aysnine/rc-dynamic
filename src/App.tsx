import { useCallback } from 'react'
import { DragDropContext, DropResult, ResponderProvided } from 'react-beautiful-dnd'
import { DynamicTreeNode } from './components'
import DynamicTreeRootComponent from './components/core/DynamicTreeRootComponent'
import { useTreeData } from './hooks/useTreeData'
import { mockTree } from './mockData'

const App = () => {
  const tree = useTreeData<DynamicTreeNode>({
    getKey: (i) => i.uid,
    getChildren: (i) => i.children || [],
    initialItems: mockTree,
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

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <DynamicTreeRootComponent tree={tree} />
      </DragDropContext>
    </div>
  )
}

export default App
