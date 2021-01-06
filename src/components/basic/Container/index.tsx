import { FC } from 'react'
import { Droppable, Draggable } from 'react-beautiful-dnd'
import { DynamicComponentBaseProps } from '../../'
import DynamicTreeNodeComponent from '../../core/DynamicTreeNodeComponent'

const Container: FC<DynamicComponentBaseProps> = ({ node }) => {
  return (
    <div>
      <div style={{ padding: '10px', backgroundColor: '#e3f2fd' }}>【{node.key}】container</div>

      <Droppable droppableId={String(node.key)} isCombineEnabled>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              style={{ border: '5px solid #e3f2fd', borderTop: '0' }}
              {...provided.droppableProps}
            >
              {node.children.map((i, index) => {
                return (
                  <Draggable key={i.key} draggableId={String(i.key)} index={index}>
                    {(provided) => {
                      return (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            border: '10px solid transparent',
                            ...provided.draggableProps.style,
                          }}
                        >
                          <div style={{ padding: '10px', backgroundColor: '#64b5f6' }} {...provided.dragHandleProps}>
                            【{i.key}】drag me
                          </div>
                          <div style={{ padding: '10px', border: '5px solid #64b5f6', borderTop: '0' }}>
                            <DynamicTreeNodeComponent node={i} index={index} />
                          </div>
                        </div>
                      )
                    }}
                  </Draggable>
                )
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
