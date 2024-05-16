import React, { useContext } from "react";
import { TodoContext } from "../store/todo-context";
import TodoItem from './TodoItem'
import classes from './Todos.module.css'

const Todos: React.FC = (props) => {

    const todosCtx = useContext(TodoContext);

    return (
        <ul className={classes.todos}>
            {
                todosCtx.items.map(item => (
                    <TodoItem
                        key={item.id}
                        text={item.task}
                        onRemove={todosCtx.removeTodo.bind(null, item.id)}
                    />
                ))
            }
        </ul>
    )
}

export default Todos;