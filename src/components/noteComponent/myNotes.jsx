import { useMemo, useState } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useNote } from '../../contexts/Notes';
import NoteCmp from './noteCmp';
import Alert from '../alert';

const myNotes = () =>{
    const { isAuthenticated} = useAuth();
    const { notes, getNotes} = useNote();   
    
    const[showAlert, setShowAlert] = useState(false);
    const[alert, setAlert] = useState({
        type: "",
        message: ""
    })

    const displayAlert = (type, message) =>{
        setAlert({type: type, message: message})
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 2000);
    }
    
    useMemo(async () => {
        if (isAuthenticated()) {
            await getNotes();
            displayAlert("success", "Notes loaded successfully.")
        }
    },[isAuthenticated()])

    if (isAuthenticated()) {
        return(
            <>
                { showAlert && <div className='container d-flex justify-content-center'>
                    <Alert alert={alert} />
                </div> }
                <div className="container mt-4">
                    <h1>Notes:</h1>

                    <div className="flex flex-col sm:grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-4 mx-4">
                        <NoteCmp alert={displayAlert} notes={notes} key={notes.map((a, i)=>{return i})}/>
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