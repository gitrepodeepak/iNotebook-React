import React from 'react';

export default function NoteCmp(props){
    return(
        <>
        <table className="table table-dark table-striped-columns">
        <thead>
            <tr>
            <th scope="col">#</th>
            <th scope="col">Notes</th>
            </tr>
        </thead>
        {props.notes.map((notes, index)=>{
            {return  <tbody key={index}>
                        <tr>
                        <th scope="row">{index+1}</th>
                        <td>{notes}</td>
                        </tr> 
                    </tbody>
                }
            })}
            </table>
        </>
    )
}