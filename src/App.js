import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from "./components/header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";
import TaskDetais from "./components/TaskDetais";

function App() {
  // const name = 'BraLaryea'
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const taskFromServer = await fetchTasks()
      setTasks(taskFromServer)
    }
    fetchTasks()

    getTasks()
  }, [])

  // fetching tasks from db
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // fetching task from db
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    return data
  }

  // add Task
  const addTask = async (task) => {
    const res = await fetch(`http://localhost:5000/tasks/`, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(task)
    })

    const data = await res.json()
    setTasks([...tasks, data])
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task }
  }

  // delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter((task) =>
      task.id !== id
    ))
  }

  // toggle reminder
  const toggleReminder = async (id) => {

    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: data.reminder } : task
    ))
  }

  return (
    <Router>
      <div className="container">
        {/* <Header title='Task Tracker from Appjs page' /> */}
        {/* <h1>hello {name}</h1> */}
        <Header showForm={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Routes>
          <Route path="/"
            element={
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ?
                  < Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
                  : 'No Tasks to show'
                }
              </>
            } />
          <Route path='/about' element={<About />} />
          <Route path='/task/:id' element={<TaskDetais />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 
