class Todo {
    id: string;
    task: string;

    constructor(todoText: string) {
        this.id = new Date().toISOString();
        this.task = todoText;
    }
}

export default Todo;