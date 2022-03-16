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

  // check if any tasks in local storage and populate if there is
  useEffect(() => {
    if (localStorage.getItem('tasks')) {
      fetchTasks()
    }
  }, [])

  // update local storage anytime tasks update
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks]);

  // fetching tasks from db
  const fetchTasks = () => {
    setTasks(JSON.parse(localStorage.getItem('tasks')))
  }

  // fetching task from db
  const fetchTask = (id) => {
    const data = tasks.find((task) => task.id === id)
    return data
  }

  // add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = { id, ...task }
    setTasks([...tasks, newTask])
  }

  // delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) =>
      task.id !== id
    ))
  }

  // toggle reminder
  const toggleReminder = (id) => {
    const taskToToggle = fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: updTask.reminder } : task
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
