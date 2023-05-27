import {MdAdd} from 'react-icons/md'
import { useCallback, useState } from "react";
import styled from 'styled-components';


function ToDoInput({onInsert}) {
    
    const [value, setValue] = useState('');
    const onChange = useCallback(e=>{
        setValue(e.target.value);
    },[])
    const onSubmit = useCallback(
        async (e) => {
            onInsert(value);
            setValue(''); //value 초기화
            //기본이벤트(새로고침) 방지
            e.preventDefault();
        }
    ,[onInsert, value])
    return (
        <TodoFrom className="TodoInsert" onSubmit={onSubmit}>
            <input 
            onChange={onChange}
            value={value} placeholder="할 일을 입력하세요" />
            <SubmitButton type="submit">
                <MdAdd />
            </SubmitButton>
        </TodoFrom>
    )
}

export default ToDoInput;

const TodoFrom = styled.form `
  display: flex; 
  background: rgb(228,227,230);
  input {
    width: 100%;
    background: none;
    outline: none;
    border: none;
    padding: 0.5rem;
    font-size: 1rem;
    line-height: 1.5;
    margin-left: 0.5rem;
    color: rgb(24,25,27);
    &::placeholder {
      color: rgb(135,135,135);
    }
  }
`

const SubmitButton = styled.button `
  background: none;
  outline: none;
  border: none;
  background: rgb(135,135,135);
  color: white;
  padding: 0 1rem;
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.1s background ease-in;
    &:hover {
      background:  rgb(132,132,132);
    }
`

