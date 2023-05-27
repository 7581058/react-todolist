import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

function ToDoEdit({ insertToggle, selectedTodo, onUpdate }) {
  const [value, setValue] = useState('');
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  const onSubmit = useCallback(
    (e) => {
      onUpdate(selectedTodo.id, value);
      setValue('');
      e.preventDefault();
    },
    [onUpdate, value],
  );
  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);
  return (
    <EditBackground className="background">
      <EditForm onSubmit={onSubmit} className="todoedit__insert">
        <h2>수정하기</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">수정하기</button>
      </EditForm>
    </EditBackground>
  );
}

export default ToDoEdit;

const EditBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, 0.548);
`

const EditForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  h2 {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    text-align: center;
    padding: 0.5rem;
    background-color: rgb(25,119,252);
    color: white;
  }
  input {
    margin: 2rem 0;
    padding: 0.3rem;
    border: none;
    outline: none;
    border-bottom: 1px solid rgb(25,119,252);
  }
  button {
    cursor: pointer;
    background-color: rgb(25,119,252);
    border: none;
    color: white;
    padding: 0.5rem 1rem;
    margin-bottom: 1rem;
  }
`