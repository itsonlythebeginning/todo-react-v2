import "./App.css";
import {useContext, useEffect} from "react";
import TodoSearch from "./components/TodoSearch";
import TodoStatus from "./components/TodoStatus";
import TodoList from "./components/TodoList";
import TodoCreate from "./components/TodoCreate";
import TasksContext from "./context/TasksContext";






function App() {


    const {stableFetchTasks} = useContext(TasksContext)


    useEffect( () => {
        stableFetchTasks()
    }, [stableFetchTasks] )



    return (

        <div className="todoApp">

            <div className="todoApp__header header">
                <h1 className="header-title">TodoApp v2</h1>
                <TodoStatus/>
            </div>

            <TodoSearch/>

            <TodoList/>

            <TodoCreate/>

        </div>

    )


}




export default App