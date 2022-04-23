import react, { useState } from "react";
import NoteContext from './NoteContext'

const NoteState = (props) => {
    const host = "http://localhost:5000";
    const initial =[];
    

    const [notes, update] = useState(initial)
    const getAll= async() => {

        const response = await fetch(`${host}/api/notes/fetchnotes`,{
            method: 'GET',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },

           
        });
        const json=await response.json();
        update(json);
       
    }
    const add = async(title,description, tag) => {

        const response = await fetch(`${host}/api/notes/addnotes`,{
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },

            body: JSON.stringify({title,description,tag})
        });
        const note =  await response.json();
   update(notes.concat(note));
    
      

       
    }
    const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/delete/${id}`,{
            method: 'DELETE',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },

           
        });
        const json = response.json();

        const newNotes = notes.filter((note) => {
            return note._id !== id
        })
        update(newNotes)
    }
    const edit = async(id, title, description, tag) => {

        const response = await fetch(`${host}/api/notes/updatenotes/${id}`,{
            method: 'POST',

            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')

            },

            body: JSON.stringify({title,description,tag})
        });
        const json = response.json();

        for (let index = 0; index < notes.length; index++) {
            const element = notes[index];
            if (element._id === id) {
                element.title = title;
                element.description = description;
                element.tag = tag;
            }
        }

    }
    return (
        <NoteContext.Provider value={{ notes, add, deleteNote,getAll,edit }}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;