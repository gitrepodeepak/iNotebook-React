import React, { useRef } from 'react';
import { useNote } from '../../contexts/Notes';

export default function NoteCmp(props){
    const inputRef = useRef();

    const { getNotes, addNote, delNote } = useNote();

    const processDelNote = async (note) =>{
        await delNote(note);
        await getNotes();
    }

    const processAddNote = async (event) =>{
        event.preventDefault();
        const value = inputRef.current.value;
        await addNote(value);
        await getNotes();
    }

    return(
        <>
        <table className="table table-light table-striped-columns">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Notes</th>
            <th scope="col">Delete</th>
            </tr>
        </thead>
        {props.notes.map((notes, index)=>{
            {return  <tbody key={index}>
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{notes}</td>
                        <td><button type="button" className="btn btn-danger" onClick={()=>{processDelNote(notes)}}>Delete</button></td>
                        </tr> 
                    </tbody>
                }
            })}
            </table>

            <div className='container'>
                <form onSubmit={processAddNote}>
                    <input className="form-control form-control-md" type="text" placeholder="Add Note" aria-label="default input example" ref={inputRef} />
                </form>
            </div>


        </>
    )
}