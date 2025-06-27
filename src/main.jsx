import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {
 
  RouterProvider,
} from "react-router";

import React from "react";
import { router } from './Router/Router.jsx';
import AuthProvider from './Contexts/AuthProvider.jsx';
import ModeProvider from './DarkLightMode/ModeProvider.jsx';






createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ModeProvider>
    <RouterProvider router={router} />
    </ModeProvider>
    </AuthProvider>
    
  </StrictMode>,
)
