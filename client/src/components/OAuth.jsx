import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../../firebase'
import { useDispatch } from 'react-redux'
import { singInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';



function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider()
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            // const res = await fetch('/api/auth/google', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json'
            //     },
            //     body: JSON.stringify({
            //     name: result.user.displayName, 
            //     email: result.user.email, 
            //     photo: result.user.photoURL })
            // })
            // const data = await res.json()
            // dispatch(singInSuccess(data))
            // navigate('/home')

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL
                })
            });

            const data = await res.json();
            console.log("API Response:", data); // Log API response

            dispatch(singInSuccess(data));  // Keep your action name
            navigate('/home');


        } catch (error) {
            console.log('Could not sign in with google', error)
        }
    }
    return (
        <button type='button' onClick={handleGoogleClick} className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-95'>Continue with google</button>
    )
}

export default OAuth
