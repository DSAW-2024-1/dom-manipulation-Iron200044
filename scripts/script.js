console.log("JavaScript working!");

const lista=document.querySelector('#lista-tarea');
const input=document.querySelector('#newTaskInput');
const boton=document.querySelector('.botonAñadir')
const checkTarea='btn-success'
const unCheckTarea='btn-warning'
const lineThrough='line-through'
let id=0;
//Añadir tareas al dar click con el boton de añadir
function añadirtarea (tarea,id,realizado,eliminado){

    if(eliminado){
        return
    }

    const REALIZADO= realizado ?checkTarea  : unCheckTarea;
    const LINE=realizado ?lineThrough: '';

    const tareaNueva=`<li
                    class="d-flex align-items-center justify-content-center rounded"
                    style="background-color: #E48F45; margin: 5px 0;"
                >
                    <p class="text m-2 ${LINE}" ><b>${tarea}</b></p>
                    <div style="margin-left: auto; margin-right: 10px">
                <i
                    class="fas fa-check btn ${REALIZADO} cursor-pointer"
                    style="margin-right: 2px"
                    data="realizado"
                    id="${id}"
                ></i>
                <i
                    class="fas fa-trash de btn btn-danger cursor-pointer"
                    data="eliminado"
                    id="${id}"
                ></i>
                </div>
                </li`
    lista.insertAdjacentHTML("beforeend",tareaNueva)
}

//Marcar el texto con una linea si la tarea esta hecha
function tareaHecha(boton){
    boton.classList.toggle(checkTarea)
    boton.classList.toggle(unCheckTarea)
    const tareaElemento = boton.closest('li').querySelector('.text');
    tareaElemento.classList.toggle(lineThrough);
}

boton.addEventListener('click',()=>{
    const tarea=input.value
    if(tarea){
        añadirtarea(tarea,id,false,false)
    }
    input.value=''
    id++
})

//Eliminar la tarea
function tareaEliminada(boton){
    const tareaLi = boton.closest('li');
    tareaLi.parentNode.removeChild(tareaLi);
}

document.addEventListener('keyup',function(event){
    if(event.key=='Enter'){
        const tarea=input.value
        if(tarea){
            añadirtarea(tarea,id,false,false)
        }
        input.value=''
        id++
    }
})

lista.addEventListener('click',function(event){
    const boton=event.target
    const botonData=boton.attributes.data.value
    if(botonData==='realizado'){
        tareaHecha(boton)
    }
    else if(botonData==='eliminado'){
        tareaEliminada(boton)
    }
})