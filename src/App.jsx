import Login from "./components/login";
import About from "./components/about"
import Root from "./routes/root";
import MyNotes from "./components/noteComponent/myNotes";
import Signup from "./components/signup";
import Home from "./components/home";
import { Auth } from './contexts/Auth'
import { Notes } from "./contexts/Notes"

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children:[
      {
        index: true,
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "/signup",
        element: <Signup/>
      },
      {
        path: "/notes",
        element: <MyNotes/>
      },
      {
        path: "/about",
        element: <About/>
      }
    ]
  },
]);

function App() {
  return (
    <>
      <Auth>
        <Notes>
          <RouterProvider router={router} />
        </Notes>
      </Auth>
    </>
  )
}

export default App
