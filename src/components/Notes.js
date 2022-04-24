import React, { useRef, useState } from 'react';

import { useContext } from 'react/cjs/react.development';

import { AddNote } from './AddNote';
import NoteContext from './context/notes/NoteContext';
import { NoteItem } from './NoteItem';
export const Notes = () => {
  const context = useContext(NoteContext);  //notecontext ko hm lekr aae 
  const { notes, getAll } = context;

  const ref = useRef(null);
  const update = (cnote) => {
    ref.current.click();
    set({ etitle: cnote.title, edescription: cnote.description, etag: cnote.tag })
  }
  const [note, set] = useState({ etitle: "", edescription: "", etag: "" })
  const onChange = (e) => {
    set({ ...note, [e.target.name]: e.target.value })
  }
  const handle = (e) => {
    e.preventDefault()
    //form k data ko bhj rhe hai baahar
  }
  // console.log(ref.current.value)
  return (
    <>
      <AddNote />
      <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal" >
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit your Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} name="etitle" aria-describedby="emailHelp" onChange={onChange} />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">description</label>
                  <input type="text" className="form-control" name="edescription" value={note.edescription} id="edescription" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">tag</label>
                  <input type="text" className="form-control" name="etag" value={note.etag} id="etag" onChange={onChange} />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handle}>Submit</button>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary">Save changes</button>
            </div>
          </div>
        </div>
      </div>


      <div className="container my-3">
        <div className="row">
          <div align="center">
            <h1> Your Notes</h1>
          </div>
          {notes.map((note) => {
            return <NoteItem key={note._id} note={note} update={update} />  //jo jo entry note k array me hoge vo card bnn k fetch ho jaega aur kyunki add note phle likha gya h//
          })}

        </div>
      </div>
    </>
  )
};
