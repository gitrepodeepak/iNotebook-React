import { useMemo, useEffect } from 'react';
import { useAuth } from '../../contexts/Auth';
import { useNote } from '../../contexts/Notes';
import NoteCmp from './noteCmp';

const myNotes = () =>{
    const { isAuthenticated, logout } = useAuth();
    const { notes, getNotes} = useNote();

    useMemo(()=>{
        let response = null;
        console.log("UseEffect is Run...")
        const check = async ()=>{
            if (isAuthenticated()) {
                response = await getNotes();
                console.log(response);
                if (response==null) {
                    getNotes();
                }else{
                    const result = await response;
                    if(result.response.status==401){
                        // console.log("logging out...")
                        logout();
                    }
                }
            }
        }
        check();
        // return ()=>{response = null};
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