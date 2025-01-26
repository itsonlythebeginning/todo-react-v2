import {useState, createContext, useCallback} from "react";
import axios from "axios";


const TasksContext = createContext()

function Provider({children}) {


    const [tasks, setTasks] = useState([])

    const [activeCount, setActiveCount] = useState(0)
    const [doneCount, setDoneCount] = useState(0)





    const fetchTasks = async () => {

        const response = await axios.get("http://localhost:3001/tasks")

        let activeTasksCount = 0
        let doneTasksCount = 0

        response.data.forEach(function (task) {

            if (!task.done) {
                activeTasksCount++
            }
            else {
                doneTasksCount++
            }

        })


        setTasks(response.data)

        setActiveCount(activeTasksCount)
        setDoneCount(doneTasksCount)

    }



    const stableFetchTasks = useCallback(fetchTasks, [])





    const addTodoTask = async (title) => {

        const response =  await axios.post("http://localhost:3001/tasks",
            {title: title, done: false, isVisibility: true}
        )

        setActiveCount(activeCount+1)

        setTasks([...tasks, response.data])

    }



    const deleteTodoTask = async (id , task) => {

        await axios.delete(`http://localhost:3001/tasks/${id}`)

        const updatedArr = tasks.filter(function (task) {
            return task.id !== id
        })


        if (task.done) {
            setDoneCount(doneCount-1)
        }
        else {
            setActiveCount(activeCount-1)
        }

        setTasks(updatedArr)

    }


    const editTaskByID = async (id, newTitle, task) => {

        await axios.put(`http://localhost:3001/tasks/${id}`,
            {...task, title: newTitle}
        )

        const updatedArr = tasks.map(function (task) {

            if (task.id === id) {
                return {...task, title: newTitle}
            }
            else {
                return task
            }

        })

        setTasks(updatedArr)

    }




    const doneTaskById = async (id ,task) => {

        let taskDone = task.done

        await axios.put(`http://localhost:3001/tasks/${id}`,
            {...task, done: !taskDone}
        )

        const updatedArr = tasks.map(function (task) {

            if (task.id === id) {

                let taskDone = task.done

                return {...task, done: !taskDone}
            }
            else {
                return task
            }

        })


        if (task.done) {
            setDoneCount(doneCount-1)
            setActiveCount(activeCount+1)
        }
        else {
            setActiveCount(activeCount-1)
            setDoneCount(doneCount+1)
        }

        setTasks(updatedArr)

    }




    const showOnlyDoneTasks = () => {

        const updatedArr = tasks.map(function (task) {

            if (task.done) {
                return {...task, isVisibility: false}
            }
            else {
                return {...task, isVisibility: true}
            }

        })

        setTasks(updatedArr)

    }




    const showOnlyActiveTasks = () => {

        const updatedArr = tasks.map(function (task) {

            if (task.done) {
                return {...task, isVisibility: true}
            }
            else {
                return {...task, isVisibility: false}
            }

        })

        setTasks(updatedArr)

    }




    const showAllTasks = () => {

        const updatedArr = tasks.map(function (task) {
            return {...task, isVisibility: true}
        })

        setTasks(updatedArr)

    }



    const searchTodoByTerm = (term) => {

        const updatedArr = tasks.map(function (task) {

            if (task.title.toLowerCase().indexOf(term.toLowerCase()) === -1) {
                return {...task, isVisibility: false}
            }

            else {
                return {...task, isVisibility: true}
            }

        })

        setTasks(updatedArr)

    }




    const valueToShare = {
        tasks: tasks,
        addTodoTask: addTodoTask,
        deleteTodoTask: deleteTodoTask,
        editTaskByID: editTaskByID,
        doneTaskById: doneTaskById,
        showOnlyDoneTasks: showOnlyDoneTasks,
        showOnlyActiveTasks: showOnlyActiveTasks,
        showAllTasks: showAllTasks,
        activeCount: activeCount,
        doneCount: doneCount,
        searchTodoByTerm:searchTodoByTerm,
        stableFetchTasks: stableFetchTasks
    }


    return (

        <TasksContext.Provider value={valueToShare}>
            {children}
        </TasksContext.Provider>

    )


}









export {Provider}


export default TasksContext






