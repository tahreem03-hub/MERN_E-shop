import React from 'react'
import {Route, Routes} from 'react-router-dom' 
import toast, { Toaster } from 'react-hot-toast'
import { useEffect } from 'react'
import axios from 'axios'

import Store from './redux/Store'
import { loadUser } from './redux/actions/user'

import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ActivationPage from './pages/ActivationPage'
import HomePage from  './pages/HomePage'

const App = () => {

  useEffect(()=>{
    Store.dispatch(loadUser());
  }, [])
  
  return (
    <>
   
    <Toaster/>
    <Routes>

      <Route path='/' element={<HomePage/>}/>


      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
    </Routes>
    </>
  )
}
export default App
