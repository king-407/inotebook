import React from 'react';
import { useContext } from 'react/cjs/react.development';
import NoteContext from './context/notes/NoteContext';

export const NoteItem = (props) => {
  const Context =useContext(NoteContext);
  const {deleteNote}=Context;
    // const {note}=props
  return (
 
    //   these cards will be fetched by the user so col-md-3 will be written here// 
<div className="col-md-3 my-2"> 
<div className="card"> 
  <div className="card-body">
    <h5 className="card-title">{props.note.title}</h5>
    <p className="card-text">{props.note.description}</p>
    <i className="fas fa-trash-alt" onClick={()=>{deleteNote(props.note._id)}}></i>
    <i className="fas fa-edit mx-3" onClick={()=>{props.update()}}></i>
  </div>
</div>
</div>
  
  )
  };
