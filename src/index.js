import './style.css';
// import { ToDo } from './classes/todo.class';
import { ToDo, ToDoList } from './classes';
import { crearTodoList } from './componenetes';


export const todoList = new ToDoList(); 

todoList.todos.forEach( todo => crearTodoList(todo)); 



