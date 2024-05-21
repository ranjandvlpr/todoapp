
import { useEffect, useState } from 'react';
import './App.css';
import NavBar from './components/NavBar';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])

  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    console.log(todos)
    saveToLocalStorage()
  }

  const handleEdit = (e, id) => {
    let editTodos = todos.filter(item => item.id === id)
    setTodo(editTodos[0].todo)
    handleDelete(e, id)
    saveToLocalStorage()

  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)

  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos]
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage()
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  return (
    <>
      <NavBar />
      <div className="md:container md:w-[40%] mx-3 md:mx-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]">
        <h1 className="text-center text-xl font-bold mb-5">iTask - Manage your todos at one place</h1>
        <div className='addTodo'>
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className="w-full px-5 py-1 rounded-full" />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 disabled:bg-slate-700 hover:bg-violet-950 font-bold p-2 py-1 my-3 w-full text-white rounded-lg  '>Save</button>
        </div>

        <input type="checkbox" onChange={toggleFinished} className="mt-4 " name="" checked={showFinished} id="showFinished" />
        <label className='font-bold p-2 py-1 ' htmlFor='showFinished'>Show Finished</label>
        <div className='bg-black h-[0.75px] mt-2' />
        <h2 className="text-lg font-bold mt-2">Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todo to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between  my-3">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>
                  {item.todo}
                </div>
              </div>
              <div className='buttons flex h-full'>
                <button onClick={(e) => { handleEdit(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 font-bold p-2 py-1 text-white rounded-md mx-2'><FaEdit /></button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 font-bold p-2 py-1 text-white rounded-md mx-2'><MdDelete /></button>
              </div>
            </div>
          })}
        </div>
      </div>

    </>
  );
}

export default App;


