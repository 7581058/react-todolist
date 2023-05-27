import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

function ToDoEdit({ insertToggle, selectedTodo, onUpdate }) {
  const [value, setValue] = useState('')

  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, [])

  // const onSubmit = useCallback(
  //   (e) => {
  //     onUpdate(selectedTodo.id, value);
  //     setValue('');
  //     e.preventDefault();
  //   },
  //   [onUpdate, value],
  // );

  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const capturedValue = value; // 현재 값을 캡처
  
      // capturedValue를 사용하여 원하는 동작 수행
      onUpdate(selectedTodo.id, capturedValue);
      setValue('');
    },
    [onUpdate, selectedTodo.id, value]
  );

  useEffect(() => {
    if (selectedTodo) {
      setValue(selectedTodo.text);
    }
  }, [selectedTodo]);
  return (
    <EditBackground className="background">
      <EditForm>
        <h2>수정하기</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <div className='btn-wrap'>
          <button>취소</button>
          <button type="submit" onClick={onSubmit}>수정</button>
        </div>
      </EditForm>
    </EditBackground>
  );
}

export default ToDoEdit;

const EditBackground = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 5;
  background-color: rgba(0, 0, 0, .3);
  
`

const EditForm = styled.form`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: #fff;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-shadow: 0 1px 1px rgba(0,0,0,0.1), 0 2px 2px rgba(0,0,0,0.1); 
  padding: 20px;
  box-sizing: border-box;
  .btn-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 50px;
    gap: 40px;
  }
  h2 {
    box-sizing: border-box;
    width: 100%;
    margin: 0;
    text-align: center;
    padding: 0.5rem;
    color: white;
  }
  input {
    width: 100%;
    font-size: 1rem;
    color: #37352f;
    height: 30px;
    padding: 0.5rem;
    outline: none;
    border: 2px solid #dedede;
    border-radius: 8px;
  }
  button {
    cursor: pointer;
    background-color: #dedede;
    border: none;
    
    width: 100px;
    height: 40px;
    border-radius: 8px;
    // padding: 0.5rem 1rem;
    margin-bottom: 1rem;
    &[type='submit'] {
      background-color: #37352f;
      color: #fff;
    }
  }
`