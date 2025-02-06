import "./TodoList.css"
import {useContext} from "react";
import TodoShow from "./TodoShow";
import TasksContext from "../context/TasksContext";


function TodoList() {


    const {tasks, term} = useContext(TasksContext)

    const renderedTasks = tasks.map(function (task, index) {

        if (term) {
            if (task.title.toLowerCase().indexOf(term.toLowerCase()) !== -1) {
                return <TodoShow task={task} key={task.id}/>
            }
        }
        else {
            return <TodoShow task={task} key={task.id}/>
        }

    })


    return (

        <div className="todoList">
            {renderedTasks}
        </div>

    )

}




export default TodoList


