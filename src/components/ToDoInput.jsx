import {MdAdd} from 'react-icons/md'
import { useCallback, useState } from "react"
import styled from 'styled-components'

function ToDoInput({onInsert}) {
  const [value, setValue] = useState('')
  const onChange = useCallback(e=>{
      setValue(e.target.value)
  },[])
  const onSubmit = useCallback(
      async (e) => {
          onInsert(value)
          setValue('')
          e.preventDefault()
      }
  ,[onInsert, value])
  return (
    <TodoFrom className="TodoInsert" onSubmit={onSubmit}>
        <input 
          onChange={onChange}
          value={value} placeholder="할 일을 입력하세요 :D" 
          maxLength={24}
        />
        <SubmitButton type="submit">
            <MdAdd />
        </SubmitButton>
    </TodoFrom>
  )
}

export default ToDoInput

const TodoFrom = styled.form `
  width: 100%;
  display: flex; 
  justify-content: center;
  input {
    width: 512px;
    height: 40px;
    background: none;
    outline: none;
    border: 1px solid #dedede;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    padding: 16px;
    box-sizing: border-box;
    font-size: 16px;
    &::placeholder {
      color: #dedede;
    }
  }
`

const SubmitButton = styled.button `
  background: none;
  outline: none;
  border: none;
  background-color: #37352f;
  color: white;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  font-size: 20px;
`

