import React, { useRef} from 'react';
import { useNote } from '../../contexts/Notes';
import Cross from '../../assets/cross.png'

export default function NoteCmp(props){
    const inputRef = useRef();

    const { getNotes, addNote, delNote } = useNote();

    const processDelNote = async (note) =>{
        await delNote(note);
        await getNotes();
        props.alert("success", "Note deleted successfully")
    }

    const processAddNote = async (event) =>{
        event.preventDefault();
        const value = inputRef.current.value;
        await addNote(value);
        await getNotes();
        props.alert("success", "Note Added successfully")
    }

    return(
        <>
        <div className='container mb-4'>
                <form onSubmit={processAddNote}>
                    <input className="form-control form-control-md text-secondary text-bg-light p-3 fw-light" type="text" placeholder="Add note from here!" ref={inputRef} />
                </form>
            </div>

        {props.notes.map((notes, index)=>{
            {return <div className="card mb-2 text-bg-light text-secondary" key={index}>
                    <div className="card-body d-flex justify-content-between align-item-center">
                      {notes} <a role='button' onClick={()=>{processDelNote(notes)}}><img src={Cross} style={{width: '32px'}} alt="Cross" /></a>
                    </div>
                  </div>
                }
            })}

        </>
    )
}