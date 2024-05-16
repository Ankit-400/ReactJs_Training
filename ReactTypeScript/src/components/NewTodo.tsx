import React, { useRef, useContext } from "react";
import { TodoContext } from "../store/todo-context";
import classes from './NewTodo.module.css'

const NewTodo: React.FC = () => {

    const todosCtx = useContext(TodoContext)
    const todoTextInputRef = useRef<HTMLInputElement>(null);

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();

        const enteredText = todoTextInputRef.current!.value;
        // If we are sure that at this point of time the value will be present inside object.

        if (enteredText.trim().length === 0) {
            // throw an error
            return;
        }

        todosCtx.addTodo(enteredText)
    }

    return (
        <form onSubmit={submitHandler} className={classes.form}>
            <label htmlFor="text" >Todo Text : </label>
            <input type="text" id="text" ref={todoTextInputRef} />
            <br />
            <button>Add Todo</button>
        </form>
    )
}

export default NewTodo;