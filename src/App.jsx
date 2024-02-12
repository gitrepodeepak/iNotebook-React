import Login from "./components/login";
import About from "./components/about"
import Root from "./routes/root";
import Notes from "./components/notes";
import {Auth} from './contexts/Auth'

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
        element: <Login/>

      },
      {
        path: "/notes",
        element: <Notes/>
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
        <RouterProvider router={router} />
      </Auth>
    </>
  )
}

export default App
