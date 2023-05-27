import React, { useCallback } from 'react';
import ToDoListItem from './ToDoListItem';
import {List} from 'react-virtualized'
import styled from 'styled-components';

function ToDoList({ todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle }) {
  const rowRender = useCallback(
    ({index,key,style}) => {
      const todo = todos[index];
      return(

        <ToDoListItem
        todo={todo}
        key={key}
        onToggle={onToggle}
        onRemove={onRemove}
        onInsertToggle={onInsertToggle}
        onChangeSelectedTodo={onChangeSelectedTodo}
        style={style}
      />
      )
    },
    [ todos, onRemove, onToggle, onChangeSelectedTodo, onInsertToggle ]
  )
  
  return (
    <ListContainer>
      <List 
        className='TodoList'
        width={512} // 전체너비
        height={513}// 전체 높이
        rowCount={todos.length}//항목갯수
        rowHeight={57} // 항목 높이
        rowRenderer={rowRender} //항목을 렌더링할 때 쓰는 함수
        list={todos}//배열
        style={{outline:'none'}} //List에 기본 적용되는 outline 스타일 제거
      />
    </ListContainer>
  );
}

export default React.memo(ToDoList);

const ListContainer = styled.div`
  padding: 0;
  list-style: none;
  min-height: 320px;
  max-height: 513px;
  overflow-y: auto;
`