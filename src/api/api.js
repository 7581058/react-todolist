const TODO_API = 'KDT5_nREmPe9B'
const USER_NAME = 'KDT5_KimDaSeul'

export async function createTodos(todo) {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: TODO_API,
          username: USER_NAME,
        },
        body: JSON.stringify({
          title: todo
        }),
      }
    )
    const json = await res.json()
    //console.log(json)
    return json
  } catch (error) {
    console.error("error create todos:", error)
  }
}

export async function getTodos() {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          apikey: TODO_API,
          username: USER_NAME,
        },
      }
    )
    const json = await res.json()
    console.log(json)
    return json
  } catch (error) {
    console.error("error get todos:", error)
  }
  
}

export async function updateTodos(id, title, done) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: TODO_API,
          username: USER_NAME,
        },
        body: JSON.stringify({
          title: title,
          done: done,
        }),
      }
    )
    const json = await res.json()
    //console.log(json)
    return json
  } catch (error) {
    console.error("error update todos:", error)
  }
}

export async function deleteTodos(id) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${id}`,
      {
        method: 'DELETE',
        headers: {
          apikey: TODO_API,
          username: USER_NAME,
        },
      }
    )
    const json = await res.json()
    return json
  } catch (error) {
    console.error("error delete todos:", error)
  }
}

export async function reorderTodos(todoIds) {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder',
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: TODO_API,
          username: USER_NAME,
        },
        body: JSON.stringify({
          todoIds: todoIds,
        }),
      }
    )
    console.log(res)
  } catch (error) {
    console.error("error reorder todos:", error)
  }
}