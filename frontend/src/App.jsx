import React from 'react'
import {Route, Routes} from 'react-router-dom' 
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import { Toaster } from 'react-hot-toast'
import ActivationPage from './pages/ActivationPage'

const App = () => {
  return (
    <>
   
    <Toaster/>
    <Routes>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/sign-up' element={<SignUpPage/>}/>
      <Route path='/activation/:activation_token' element={<ActivationPage/>}/>
    </Routes>
    </>
  )
}
export default App
