import { useAuth } from '../contexts/Auth';

const notes = () =>{

    const { token, isAuthenticated } = useAuth();

    if (isAuthenticated()) {
        return(
            <>
                <div className="container">
                    <h1>Notes</h1>
                    {notes.map(function(note){({note})})}
                    <ul>
                        {/* {notes.map((note, index)=>{<li>
                            <div className="modal" tabIndex="-1">
                                <div className="modal-dialog">
                                    <div className="modal-content">
                                    <div className="modal-header">
                                    <h5 className="modal-title">{index}</h5>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">
                                    <p>{note}</p>
                                    </div>
                                    <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="button" className="btn btn-primary">Save changes</button>
                                    </div>
                                    </div>
                                    </div>
                                </div>
                            </li> 
                        })} */}
                    </ul>
                    <button type="button" className="btn btn-primary" onClick={()=>{getNotes()}}>Get Notes</button>
                </div>
            </>
        )
    }else{
        return(
                <>
                    <div className="container">
                        <h1>Sign In</h1>
                        <p>User is not authenticated.</p>
                    </div>
                </>
            )
    }
}

export default notes;