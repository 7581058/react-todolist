import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdRemoveCircleOutline,
  MdCheckBox,
  MdModeEditOutline,
} from 'react-icons/md';
// import cn from 'classnames';
import styled from 'styled-components';

function ToDoListItem({
  todo,
  onRemove,
  onToggle,
  onChangeSelectedTodo,
  onInsertToggle,
  style
}) {
  const { id, text, checked } = todo;
  return (
    <ListContainer className="TodoListItem-virtualized" style={style}>
      <TodoListItem className="TodoListItem">
        <TodoCheckbox
          //className={cn('checkbox', { checked: checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </TodoCheckbox>
        <EditButton
          className="edit"
          onClick={() => {
            onChangeSelectedTodo(todo);
            onInsertToggle();
          }}
        >
          <MdModeEditOutline />
        </EditButton>
        <RemoveButton className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </RemoveButton>
      </TodoListItem>
    </ListContainer>
  );
}

export default React.memo(ToDoListItem);

const ListContainer = styled.div`
  & + & {
    border-top: 1px solid #dee2e6;
  }
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`
const TodoListItem = styled.li`
  padding: 1rem;
  display: flex;
  align-items: center;
`
const TodoCheckbox = styled.div`
  cursor: pointer;
  flex: 1;
  display: flex;
  align-items: center;
  svg {
    font-size: 1.5rem;
  }
  .text {
    margin-left: 0.5rem;
  }
  &.checked {
    svg {
      color: rgb(25,119,252);
    }
    .text {
      color: #adb5bd;
      text-decoration: line-through;
    }
  }
`

const EditButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  cursor: pointer;
  margin-right: 1rem;
`

const RemoveButton = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: #e84118;
  cursor: pointer;
  &:hover {
    color: #ff7f5f;
  }
`