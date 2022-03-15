import { useState } from "react"

const Tasks = () => {
    const [tasks, setTasks] = useState(
        [
            {
                id: 1,
                text: 'something on day 1',
                day: '20-09-22',
                reminder: true
            },
            {
                id: 2,
                text: 'something on day 2',
                day: '21-09-22',
                reminder: false
            },
            {
                id: 3,
                text: 'something on day 3',
                day: '22-09-22',
                reminder: true
            }
        ]
    )
    return (
        <>
            {tasks.map((task) => (
                <h3 key={task.id}>{task.text}</h3>
            ))}
        </>
    )
}

export default Tasks