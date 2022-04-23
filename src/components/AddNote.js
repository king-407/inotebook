import React, { useState,useEffect } from 'react';
import { useContext } from 'react/cjs/react.development';
import { useHistory } from 'react-router-dom';
import NoteContext from './context/notes/NoteContext';
export const AddNote = () => {
    const context=useContext(NoteContext);
    let history=useHistory();
    const {add,getAll}=context;  //add is a function in the notestate which uses backend api from there only interacts with the database//
    const[note,set]=useState({title:"",description:"",tag:""})
    
    useEffect(()=>{
      if(localStorage.getItem('token'))
      {
        getAll();   
      }
          else{
            history.push("/login");
          }   //getall function saare notes ko fetch krk le aega aur update krdega notes ko//
    },[])
    const onChange=(e)=>{
set({...note,[e.target.name]:e.target.value})
    }
    const handle=(e)=>
    {
      e.preventDefault()
add(note.title,note.description,note.tag) 
set({title:"",description:"",tag:""}) //form k data ko bhj rhe hai baahar
    }
  return <div>
      <div className="container my-3">
  <h1 align="center">Add a Note</h1>
  <form>
  <div className="mb-3">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={onChange}/>
   
  </div>
  <div className="mb-3">
    <label htmlFor="description" className="form-label">description</label>
    <input type="text" className="form-control" name="description" id="description" value={note.description} onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="tag" className="form-label">tag</label>
    <input type="text" className="form-control" name="tag" id="tag" value={note.tag} onChange={onChange}/>
  </div>
  
  <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={handle}>Submit</button>
</form>
</div>
  </div>;
};
