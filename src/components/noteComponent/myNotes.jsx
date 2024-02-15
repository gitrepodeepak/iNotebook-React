import { useMemo } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useNote } from '../../contexts/Notes';
import NoteCmp from './noteCmp';

const myNotes = () =>{
    const { isAuthenticated} = useAuth();
    const { notes, getNotes} = useNote();    
    
    useMemo(async () => {
        if (isAuthenticated()) {
            await getNotes();
        }
    },[isAuthenticated()])

    if (isAuthenticated()) {
        return(
            <>
                <div className="container">
                    <h1>Notes</h1>
                    <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 mx-4">
                        <NoteCmp notes={notes} key={notes.map((a, i)=>{return i})}/>
                    </div>
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

export default myNotes;