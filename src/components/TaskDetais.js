import { useState, useEffect } from "react"
import { useParams, useNavigate, useLocation } from "react-router-dom"
import Button from "./Button"

const TaskDetais = () => {  

    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    // const [error, setError] = useState(null)

    const params = useParams()
    const navigate = useNavigate()
    const { pathname } = useLocation()
    const location = useLocation();
    const tasks = location.state;

    useEffect(() => {
        const task = tasks.find((task) => task.id == params.id)
        if (task) {
            setTask(task)
            setLoading(false)
            return
        }
        navigate('/')
    }, [])


    return loading ? (
        <h3>Loading...</h3>
    ) : (
        <div>
            <p>{pathname}</p>
            <h3>{task.text}</h3>
            <p>{task.day}</p>
            <Button text='Go Back' onClick={() => {
                navigate(-1)
            }} />
        </div>
    )
}

export default TaskDetais