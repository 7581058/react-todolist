import { useState, useRef, useCallback, useEffect } from 'react'
import ToDoEdit from './components/ToDoEdit'
import ToDoInput from './components/ToDoInput'
import TodoList from './components/ToDoList'
import TodoTemplate from './components/ToDoTemplate'
import { createTodos, getTodos, updateTodos, deleteTodos } from './api/api'

function App() {
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [insertToggle, setInsertToggle] = useState(false)
  const nextId = useRef(4)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const todos = await getTodos();
        setTodos(todos.map((todo) => ({
          id: todo.id,
          text: todo.title,
          done: todo.done,
        })))
        nextId.current = todos.length + 1
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    }
    fetchData()
  }, [])
  const onInsert = useCallback(async (text) => {
    try {
      const createdTodo = await createTodos(text, nextId.current);
      const todo = {
        id: createdTodo.id,
        text: createdTodo.title,
        done: false,
        order: nextId.current
      }
      setTodos((todos) => todos.concat(todo))
      nextId.current++
    } catch (error) {
      console.error("Error creating todo:", error)
    }
  }, [])
  const onRemove = useCallback(async (id) => {
    try {
      await deleteTodos(id)
      setTodos((todos) => todos.filter((todo) => todo.id !== id))
    } catch (error) {
      console.error("Error deleting todo:", error)
    }
  }, [])
  
  const onInsertToggle = useCallback(() => {
    if (selectedTodo) {
      setSelectedTodo((selectedTodo) => null)
    }
    setInsertToggle((prev) => !prev)
  }, [selectedTodo]);

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo)
  }

  const onUpdate = useCallback(async (id, text) => {
    try {
      await updateTodos(id, text, selectedTodo.done);
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      );
      onInsertToggle();
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  }, [onInsertToggle, selectedTodo]);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }, []);

  return (
    <TodoTemplate>
      <ToDoInput onInsert={onInsert} />
      <TodoList
        todos={todos}
        onToggle={onToggle}
        onRemove={onRemove}
        onChangeSelectedTodo={onChangeSelectedTodo}
        onInsertToggle={onInsertToggle}
      />
      {insertToggle && (
        <ToDoEdit
          onInsert={onInsert}
          selectedTodo={selectedTodo}
          onInsertToggle={onInsertToggle}
          onUpdate={onUpdate}
          insertToggle={insertToggle}
        />
      )}
    </TodoTemplate>
  )
}
export default App