import React from 'react'
import {Route, Routes} from 'react-router-dom' 
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import toast, { Toaster } from 'react-hot-toast'
import ActivationPage from './pages/ActivationPage'
import { useEffect } from 'react'
import axios from 'axios'

const App = () => {

  useEffect(()=>{
    axios.get(`${import.meta.env.VITE_URL}/user/getUser`, {withCredentials: true}).then((res)=>{
      toast.success(res.data.message)
    }).catch((err)=>{
      toast.error(err.response?.data?.message);
     
    })
  }, [])
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
