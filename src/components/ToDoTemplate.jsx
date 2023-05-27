import styled from "styled-components"
import { CgBoard } from 'react-icons/cg'

function TodoTemplate({children}) {
  const today = new Date()
  const dateString = today.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
  const dayName = today.toLocaleDateString('ko-KR', {
    weekday: 'long'
  })
  return (
      <Template className="TodoTemplate">
        <div className="head-top">
          <div className="btn-board">
          <div className="board-icon">
            <CgBoard />
          </div>
          보드 보기
          </div>
          <div className="date">
            <p className="today">{dateString}</p>
            <p className="day">{dayName}</p>
          </div>
        </div>
          <TodoTitle className="head-title">
            ToDoList 
          </TodoTitle>
          <TodoContent className="content">{children}</TodoContent>
      </Template>
  )
}

export default TodoTemplate

const Template = styled.div`
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  width: 512px;
  height: 80px;
  display: flex;
  flex-direction: column;
  align-items: left;
  box-sizing: border-box;
  .head-top {
    width: 100%;
    height: 40px;
    display: flex;
    align-items: center;
    position: relative;
    border-bottom: 2px solid #dedede;
    .btn-board {
      font-size: 20px;
      display: flex;
      padding-bottom: 10px;
      border-bottom: 3px solid #37352f;
      .board-icon {
        width: 24px;
        height: 24px;
        font-size: 24px;
      }
    }
    .date {
      position: absolute;
      right: 10px;
      display: flex;
      font-size: 16px;
      .day {
        margin-left: 5px;
      }
    }
  }
`

const TodoTitle = styled.div`
  font-weight: 600;
  font-size: 32px;
  color: #37352f;
  margin-top: 10px;
  margin-bottom: 10px;
`

const TodoContent = styled.div`
  background: white;
`
