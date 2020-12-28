import { FC } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { DynamicComponentBaseProps } from '../../../types'
import DynamicTreeNodeComponent from '../../core/DynamicTreeNodeComponent'

const Container: FC<DynamicComponentBaseProps> = ({ node }) => {
  return (
    <div style={{ padding: '10px', backgroundColor: 'lightgray' }}>
      <h1>container</h1>

      <Droppable droppableId={String(node.key)} isCombineEnabled>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              style={{ padding: '1px 0', backgroundColor: 'white' }}
              {...provided.droppableProps}
            >
            {node.children.map((i, index) => {
              return <Draggable key={i.key} draggableId={String(i.key)} index={index}>
                {(provided) => {
                  return <div ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps} style={{ margin: '10px', backgroundColor: 'white', ...provided.draggableProps.style }}>
                    <DynamicTreeNodeComponent node={i} index={index} />
                  </div>
                }}
              </Draggable>
            })}
            {provided.placeholder}
          </div>
          )
        }}
      </Droppable>

    </div>
  )
}

export default Container
