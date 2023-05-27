import React from 'react'
import { MdClear } from 'react-icons/md'
import { FiEdit } from 'react-icons/fi'
import styled, { css } from 'styled-components'

function ToDoListItem({
  todo,
  onRemove,
  onToggle,
  onChangeSelectedTodo,
  onInsertToggle,
}) {
  const { id, text, done } = todo
  return (
    <TodoListItem className="TodoListItem" onClick={() => onToggle(id)} done={done}>
      <div className="text">{text}</div>
      <EditButton
        className="edit"
        onClick={() => {
          onChangeSelectedTodo(todo)
          onInsertToggle()
        }}
      >
        <FiEdit />
      </EditButton>
      <RemoveButton className="remove" onClick={() => onRemove(id)}>
        <MdClear />
      </RemoveButton>
    </TodoListItem>
  )
}

export default React.memo(ToDoListItem)

const EditButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
  color: #dedede;
  display: none;
  &:hover {
    color: #37352f;
  }
`

const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;
  color: #dedede;
  cursor: pointer;
  display: none;
  &:hover {
    color: #37352f;
  }
`

const TodoListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
  border: 1px solid #dedede;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1); 
  margin-bottom: 5px;
  .text {
    width: 100%;
  }
  &:hover {
    ${RemoveButton} {
      display: initial;
    }
    ${EditButton} {
      display: initial;
    }
  }
  ${props => props.done &&
    css`
      color: #dedede;
      text-decoration: line-through;
    `}
`

