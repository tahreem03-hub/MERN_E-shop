import React, { useEffect } from 'react'
import SignUp from '../components/SignUp/SignUp'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const SignUpPage = () => {
  const { isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return (
    <div>
      <SignUp />
    </div>
  )
}

export default SignUpPage
