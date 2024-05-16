import React, { useState } from "react";
import Todo from "../models/todo";

type TodoContextObj = {
    items: Todo[],
    addTodo: (text: string) => void,
    removeTodo: (id: string) => void
}

export const TodoContext = React.createContext<TodoContextObj>({
    items: [],
    addTodo: () => { },
    removeTodo: () => { }
});

const TodoContextProvider: React.FC = (props) => {

    const [todos, setTodos] = useState<Todo[]>([]);

    const addTodoHandler = (todoText: string) => {
        const newTodo = new Todo(todoText);

        setTodos(prev => prev.concat(newTodo))
    }

    const removeTodoHandler = (id: string) => {
        const filteredTodo = todos.filter(todo => todo.id !== id);
        setTodos(filteredTodo);
    }

    const contextValue: TodoContextObj = {
        items: todos,
        addTodo: addTodoHandler,
        removeTodo: removeTodoHandler
    }

    return <TodoContext.Provider value={contextValue}>
        {props.children}
    </TodoContext.Provider>
}

export default TodoContextProvider;