export class ToDo {

    static fromJson({tarea, id, completado, creado}) {

        const tempTodo = new ToDo( tarea ); 

        this.id         = id; 
        this.completado = completado; 
        this.creado     = creado; 

        return tempTodo; 
    }

    constructor( tarea ){
        this.tarea      =  tarea; 
        this.id         = new Date().getTime(); //1231523423
        this.completado = false; 
        this.creado     = new Date();  
    }

    imprimirClase(){
        console.log(`${ this.tarea } - ${ this.id }`)
    }

}