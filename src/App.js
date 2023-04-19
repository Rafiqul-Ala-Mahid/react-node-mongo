import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './Components/About/About';
import Home from './Components/Home/Home';

import Main from './Components/Main/Main';
import Update from './Components/Update/Update';
import UserList from './Components/UserList/UserList';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children: [
        {
          path: "home",
          element: <Home></Home>,
        },
        {
          path: "about",
          element: <About></About>,
        },
        {
          path: "users",
          element: <UserList></UserList>,
        },
        {
          path: "update/:id",
          element: <Update></Update>,
          loader: ({ params }) => fetch(`http://localhost:4000/users/${params.id}`),
        },
      ],
    },
  ]);

  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
