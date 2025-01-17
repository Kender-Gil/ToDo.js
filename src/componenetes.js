// import { ToDo } from "./classes";
import { ToDo, ToDoList } from './classes';
import { todoList } from './index'

//referencias al html 
const divTodoList           = document.querySelector('.todo-list');
const txtInput              = document.querySelector('.new-todo'); 
const btonBorrarCompletados = document.querySelector('.clear-completed');
const ulFiltros             = document.querySelector('.filters');  
const anchorFiltros         = document.querySelectorAll('.filtro'); 

export const crearTodoList = ( todo ) => {

    const htmlTodo = `
        <li class="${ (todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
			<div class="view">
				<input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' } id="toggle-${todo.id}" aria-label="Marcar como completado">
				<label>${ todo.tarea }</label>
				<button class="destroy"  aria-label="Eliminar tarea" title="Eliminar tarea"></button>
			</div>
			<input class="edit" value="Create a TodoMVC template">
		</li>`; 

    const div = document.createElement('div');
    div.innerHTML = htmlTodo; 

    divTodoList.append(div.firstElementChild); 

    return div.firstElementChild; 
}

//eventos 

txtInput.addEventListener('keyup', (event) => {
    
    if (event.keyCode === 13 && txtInput.value.length > 0){
        // console.log(txtInput.value);
        const nuevoTodo = new ToDo( txtInput.value ); 
        todoList.nuevoTodo( nuevoTodo ); 

        crearTodoList(nuevoTodo); 
        txtInput.value = ''; 
    }

});

divTodoList.addEventListener('click', (event) =>{
    const nombreElemento = event.target.localName; //input, label, button 
    const todoElemento   = event.target.parentElement.parentElement; 
    const todoId         = todoElemento.getAttribute('data-id'); 

    if( nombreElemento.includes('input') ){ // click en el check
        
        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed'); 

    }else if ( nombreElemento.includes('button')) { // click en borrar

       todoList.eliminarTodo( todoId );
       divTodoList.removeChild(todoElemento); 

    }
});

btonBorrarCompletados.addEventListener('click', () => {

    todoList.eliminarCompletados(); 

    for( let i = divTodoList.children.length-1; i >= 0; i--) {
        const elemento = divTodoList.children[i]; 
      
        if( elemento.classList.contains('completed')){
            divTodoList.removeChild(elemento); 
        }
    }
});

ulFiltros.addEventListener('click', (event) => {

    const filtro = event.target.text; 
    if(!filtro){return;} 

    anchorFiltros.forEach( elem => elem.classList.remove('selected')); 
    event.target.classList.add('selected'); 

    for(const elemento of divTodoList.children){

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');  
    
        switch( filtro ){

            case 'Pendientes':
                if(completado){
                    elemento.classList.add('hidden'); 
                }
            break;

            case 'Completados':
                if(!completado){
                    elemento.classList.add('hidden'); 
                }    
            break;     
        }
    }
}); 




