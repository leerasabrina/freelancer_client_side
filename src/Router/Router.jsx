import React from 'react';
import { createBrowserRouter } from 'react-router';
import Home from '../Pages/Home';
import Root from '../RootLayout/Root';
import AddTask from '../Pages/AddTask';
import SignIn from '../Pages/SignIn';
import SignUp from '../Pages/SignUp';
import Private from '../Private';
import MyPostedTasks from '../Pages/MyPostedTasks';
import Browse from '../Pages/Browse';
import Update from '../Pages/Update';
import MoreDetail from '../Pages/MoreDetail';
import ErrorPage from '../Pages/ErrorPage';
import Loader from '../Loader/Loader';

export const router = createBrowserRouter([
    {
      path: "/",
      errorElement:<ErrorPage></ErrorPage>,
    element:<Root></Root>,
    children:[
        {index:true,element:<Home></Home>},
        {path:'addtask',element:<Private><AddTask></AddTask></Private>},
        {path:'mytasks',element:<Private><MyPostedTasks></MyPostedTasks></Private>},
        {path:'update/:id',element:<Private><Update></Update></Private>},
        {path:'browse',element:<Browse></Browse>},
        {path:'browse/:id',
          hydrateFallbackElement:<Loader></Loader>,
          loader:({params})=>fetch(`https://freelancer-server-three.vercel.app/tasks/${params.id}`),
          element:<Private><MoreDetail></MoreDetail></Private>},
        {path:'signup',element:<SignUp></SignUp>},
        {path:'signin',element:<SignIn></SignIn>}
    ]
    },
  ]);
  
