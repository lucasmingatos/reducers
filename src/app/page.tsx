"use client"
//uso do reducer 


import { useReducer, useState } from "react";
import { Item } from "./typer/Item";
import { listReducer } from "./reducers/listReducer";

/* const Page = () => {
  //usando o reducer com um Hook

 const [list, dispatch] = useReducer(listReducer, []);

  const handleAddClick = () => {
    dispatch({
      type: 'add',
      payload: {
        text: 'novo item',
      }
    });
  }

  dispatch ({
    type: 'toggleDone',
    payload: {id: 2}
  });

  dispatch ({
    type: 'editText',
    payload: {id: 2, newText: 'Bla bla bla'},
  });
 
  dispatch ({
    type: 'remove',
    payload: {id: 3}
  });

  return(
    <div className="">
      <button onClick={handleAddClick}> Adicionar</button>
    </div>
  );
} */

const Page = () => {

  const [list, dispatch] = useReducer(listReducer, []);

  const [addField, setAddField] = useState ('');

  const handleAddButton= () => {
    if(addField.trim() === '') return false;
    
    dispatch({
      type: "add",
      payload: {
        text: addField.trim()
      }
    });

    setAddField('');

  }

  const handleDoneCheckbox = (id: number) => {
    dispatch({
      type: 'toggleDone',
      payload: { id }
    });
  }

  const handleEdit = (id: number) => {
    const item = list.find (it => it.id ===id);
    if(!item) return false;

    const newText = window.prompt('Editar tarefa', item.text);
    if(!newText || newText.trim() === '') return false;

    dispatch({
      type: 'editText',
      payload: {id, newText}
    });
  }

  const handleRemove = (id: number) => {
    if(!window.confirm('Tem certeza que deseja exlcuir?')) return false;

    dispatch({
      type: 'remove',
      payload: { id }
    });

  }


  return (
    <div className="container mx-auto bg-black text-white">
      <h1 className="text-center text-3xl my-4 text-white">Lista de tarefas</h1>
      <div className="max-w-2xl mx-auto flex rounded-md border border-gray-600 p-4 my-4">
        <input 
        type="text"
        className="flex-1 rounded-md border border-white p-3 bg-transparent text-white outline-none"
        placeholder="Digite um item"
        value={addField}
        onChange={e => setAddField(e.target.value)}
        />
        <button
        className="p-4 text-white"
        onClick={handleAddButton}
        >Adicionar</button>
      </div>

      <ul className="max-w-2xl mx-auto">
        {list.map(item => (
          <li 
            key={item.id}
            className="flex p-3 my-3 border-b border-gray-500"
          >
            <input
             type="checkbox"
             className="w-6 h-6 mr-4"
             defaultChecked={item.done}
             onClick={() => handleDoneCheckbox(item.id)}
            />
            <p className="flex-1 text-lg">{item.text}</p>
            <button onClick={() => handleEdit(item.id)} className="mx-4 text-white hover:bg-gray-400">Editar</button>
            <button onClick={() => handleRemove(item.id)} className="mx-4 text-white hover:bg-gray-400">Excluir</button>
          
          </li>
        ))}
      </ul>
      

    </div>
  );
}


export default Page;