import Navbar from "../components/navbar";
import { Outlet } from "react-router-dom";

export default function root(){
    return(
        <>
            <Navbar/>
            <Outlet/>
        </>
    )
}