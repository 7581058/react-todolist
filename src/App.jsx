import { useState, useRef, useCallback, useEffect } from 'react'
import { createTodos, getTodos, updateTodos, deleteTodos } from './api/api'
import ToDoEdit from './components/ToDoEdit'
import ToDoInput from './components/ToDoInput'
import TodoList from './components/ToDoList'
import TodoTemplate from './components/ToDoTemplate'
import ToDoSpinner from './components/ToDoSpinner'

function App() {
  const [todos, setTodos] = useState([])
  const [selectedTodo, setSelectedTodo] = useState(null)
  const [insertToggle, setInsertToggle] = useState(false)
  const [todoLoading, setTodoLoading] = useState(false)
  const nextId = useRef(4)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTodoLoading(true)
        const todos = await getTodos()
        setTodos(todos.map((todo) => ({
          id: todo.id,
          text: todo.title,
          done: todo.done,
          order: todo.order
        })))
        nextId.current = todos.length + 1
      } catch (error) {
        setTodoLoading(false)
        console.error("Error fetching todos:", error)
      } finally {
        setTodoLoading(false)
      }
    }
    fetchData()
  }, [])

  const onInsert = useCallback(async (text) => {
    try {
      const createdTodo = await createTodos(text, nextId.current)
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
  }, [selectedTodo])

  const onChangeSelectedTodo = (todo) => {
    setSelectedTodo((selectedTodo) => todo)
  }

  const onUpdate = useCallback(async (id, text) => {
    try {
      await updateTodos(id, text, selectedTodo.done, selectedTodo.order)
      setTodos((todos) =>
        todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
      )
      onInsertToggle()
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }, [onInsertToggle, selectedTodo])

  const onToggle = useCallback(async (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    )
    try {
      const updatedTodo = todos.find((todo) => todo.id === id)
      if (updatedTodo) {
        await updateTodos(id, updatedTodo.text, !updatedTodo.done, updatedTodo.order)
      }
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  }, [todos])

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
      {todoLoading && (
        <ToDoSpinner/>
      )}
    </TodoTemplate>
  )
}
export default App
