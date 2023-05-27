import React from 'react'
import ToDoListItem from './ToDoListItem'
import styled from 'styled-components'
import { MdOutlineFilterTiltShift } from 'react-icons/md'

function ToDoList({ todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle }) {
  const undoneTodos = todos.filter(todo => !todo.done)
  return (
    <ListContainer>
      <ListTitle>
        <div className="title-icon">
          <MdOutlineFilterTiltShift/>
        </div>
        할 일 
        <div className='todo-left'>{undoneTodos.length}</div>
      </ListTitle>
      {todos.map((todo) => (
        <ToDoListItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onRemove={onRemove}
          onInsertToggle={onInsertToggle}
          onChangeSelectedTodo={onChangeSelectedTodo}
        />
      ))}
    </ListContainer>
  )
}

export default React.memo(ToDoList)

const ListContainer = styled.div`
  padding: 0;
  list-style: none;
  margin: 0 auto;
  margin-bottom: 50px;
  margin-top: 30px;
`

const ListTitle = styled.div`
  color: #787774;
  width: 100%;
  height: 24px;
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 16px;
  margin-bottom: 10px;
  .title-icon {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .todo-left {
    margin-left: 10px;
  }
`

