import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom'
import axios from 'axios'

const SellerActivaetionPage = () => {
 const { activation_token } = useParams();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const activationEmail = async () => {
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_URL}/shop/activation`, { activation_token },
                { headers: { "Content-Type": 'application/json' } }
            )
            setSuccess(true);
            toast.success(data.message)
        } catch (error) {
            const message = error.response?.data?.message || error.message || "An unexpected error occurred.";
            toast.error(message);
            setError(message);
        }
    }
    useEffect(() => { if (activation_token) { activationEmail() } }, [])
    return (
        <div className='bg-gray-800 w-full h-screen flex items-center justify-center'>
            {error ? (
                <p className='text-xl text-white font-bold'>{error}</p>
            ) : success ? (
                <p className='text-xl text-white font-bold'>Your shop has been created successfully!</p>
            ) : (
                <p className='text-xl text-white font-bold'>Activating your shop...</p>
            )}

        </div>
    )
}

export default SellerActivaetionPage
