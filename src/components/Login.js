import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validations';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../utils/firebase"
import { addUser } from '../utils/userSlice';
import { useDispatch } from 'react-redux';
import { BACKGROUND_URL, USER_AVATAR } from '../utils/constants';

const Login = () => {


  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const email = useRef()
  const name = useRef()
  const password = useRef()

  const dispatch = useDispatch()
  const handleSignInToggle = () => {
    setIsSignIn(!isSignIn)
  }


  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value)
    setErrorMessage(message);
    if (message !== null) return
    if (!isSignIn) {
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
            })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)

        });
    }
    else {
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage)
        });
    }
  }

  return (
    <div >
      <Header />
      <div className=' absolute bg-fuchsia-100 w-screen h-screen object-cover'>
      
      
      <form onSubmit={(e) => e.preventDefault()} className=" w-screen md:w-3/12 absolute p-12 bg-white my-36 mx-auto right-0 left-0 text-black rounded-lg bg-opacity-80">
        <h1 className='p-2 font-bold text-gray-600 text-3xl mb-4'>{isSignIn ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignIn && <input ref={name} className="bg-black m-2 p-4 w-full  border-gray-600  border text-black rounded-sm bg-opacity-0" text="Name" type="text" placeholder='Full Name' />}
        <input ref={email} className="bg-black  border-gray-600  border m-2 p-4 w-full rounded-sm bg-opacity-0" text="Email" type="text" placeholder='Email' />
        <input ref={password} className="bg-black  border-gray-600 border m-2 p-4 w-full rounded-sm bg-opacity-0" text="Password" type="password" placeholder='Password' />
        <button onClick={handleButtonClick} className='bg-slate-600 m-2 mt-8 p-2 w-full rounded-md cursor-pointer'>{isSignIn ? 'Sign In' : 'Sign up'}</button>
        <span className='text-red-600 text-sm text-bold m-2'>{errorMessage}</span>
        <p className='p-2 text-l text-gray-400 cursor-pointer mb-8' onClick={handleSignInToggle}>{isSignIn ? 'New User?' : 'Already an user?'}<span className='text-white'> {isSignIn ? 'Sign up now.' : 'Sign in now.'}</span></p>
      </form>
      </div>
      
    </div>
  )
}

export default Login