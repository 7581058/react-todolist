import styled from "styled-components";

function TodoTemplate({children}) {
    return (
        <Template className="TodoTemplate">
            <TodoTitle className="app-title">Todo List</TodoTitle>
            <TodoContent className="content">{children}</TodoContent>
        </Template>
    )
}

export default TodoTemplate;

const Template = styled.div`
  width: 512px;
  margin: 6rem auto 0 auto;
  border-radius: 4px;
  overflow: hidden;
`

const TodoTitle = styled.div`
  background:rgb(25,119,252);
  color: white;
  font-weight: bold;
  height: 4rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
`

const TodoContent = styled.div`
  background: white;
`
