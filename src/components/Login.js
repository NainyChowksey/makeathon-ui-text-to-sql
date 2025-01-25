import React, { useState, useRef, useEffect } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../utils/userSlice';
import {checkValidData, convertResponses} from '../utils/validations';
import { USER_AVATAR } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import { addRole } from '../utils/userConfig';
import {setChatHistory} from "../utils/chatSlice";

const Login = () => {
  const [isSignIn, setIsSignIn] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const email = useRef();
  const name = useRef();
  const password = useRef();
  const key = useRef(); // New optional Key field
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userState = useSelector((store)=>store.userSlice?.user)

  const role = useSelector(state => state.userConfig.role)

  const carouselMessages = [
    '"Convert your queries effortlessly!"',
    '"Leverage AI for seamless SQL generation!"',
    '"Say goodbye to manual SQL writing!"',
  ];

  useEffect(() => {
    // Automatic carousel slide change
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselMessages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselMessages.length]);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message !== null) return;

    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        if (!isSignIn) {
          return createUserWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          ).then((userCredential) => {
            return updateProfile(userCredential.user, {
              displayName: name.current.value,
              photoURL: USER_AVATAR,
            });
          });
        } else {
          return signInWithEmailAndPassword(
            auth,
            email.current.value,
            password.current.value
          );
        }
      })
      .then((userCredential) => {
       
        const user = userCredential.user;
        console.log(user)
        const url =
          // "https://5b38-2409-40f2-200b-6a6f-f5c2-dc87-cb25-3aea.ngrok-free.app/fetchrole";
        "http://localhost:8000/metadata"
        const data = {
          uid: user.uid,
          email: user.email
        };

        const jsonData = JSON.stringify(data);

        const headers = new Headers();
        headers.append("Content-Type", "application/json");

        fetch(url, {
          method: "POST",
          headers: headers,
          body: jsonData,
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
          })
          .then((responseData) => {
               console.log("Nainy", responseData);
               dispatch(addRole(responseData?.role))

              dispatch(setChatHistory(convertResponses(responseData?.prev_question_response?.question_answer_pairs)))

          })
          .catch((error) => {
            console.error("Error:", error);
          });

        // const role_response = await fetch(
        //   "https://5b38-2409-40f2-200b-6a6f-f5c2-dc87-cb25-3aea.ngrok-free.app/chat"
        // );

        
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || "Anonymous User",
          photoURL: user.photoURL || USER_AVATAR,
          accesspermissions: role
        };

        dispatch(addUser(userData));
        localStorage.setItem("authUser", JSON.stringify(userData));
        navigate("/browse");
      })
      .catch((error) => {
        setErrorMessage(error.code + "-" + error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="rounded-2xl w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 overflow-hidden shadow-xl bg-white">
        {/* Left Section - Welcome and Carousel */}
        <div className="p-12 bg-gray-50 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold mb-6 text-center text-purple-700">
            Welcome to Just In Time!
          </h1>
          <p className="text-gray-600 text-sm mb-8 text-center">
            Experience seamless Text-to-SQL and SQL-to-Text generation with our
            AI-driven tool.
          </p>
          <div className="w-full max-w-xs">
            {/* Carousel */}
            <div className="relative">
              {carouselMessages.map((message, index) => (
                <div
                  key={index}
                  className={`absolute inset-0 text-center text-purple-700 font-medium transition-opacity duration-500 ${
                    index === currentSlide ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {message}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Login/Sign-Up Form */}
        <div className="p-12 bg-white">
          <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
            {isSignIn ? "Sign In" : "Sign Up"}
          </h2>
          <p className="text-gray-500 text-sm mb-6 text-center">
            {isSignIn
              ? "Access your account right away"
              : "Create a new account in seconds"}
          </p>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
              {errorMessage}
            </div>
          )}

          <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
    
              <>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    ref={name}
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-600 text-gray-800"
                  />
                </div>
                {/* <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Key (Optional)
                  </label>
                  <input
                    ref={key}
                    type="text"
                    placeholder="Enter your Key (optional)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-600 text-gray-800"
                  />
                </div> */}
              </>
            <div>
              <label className="block text-sm text-gray-700 mb-1">Email</label>
              <input
                ref={email}
                type="email"
                required
                placeholder="john@example.com"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-600 text-gray-800"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-700 mb-1">
                Password
              </label>
              <input
                ref={password}
                type="password"
                required
                placeholder="********"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 focus:ring-2 focus:ring-purple-600 text-gray-800"
              />
            </div>
            <button
              onClick={handleButtonClick}
              className="w-full bg-purple-600 text-white font-medium py-3 rounded-lg hover:bg-purple-700 transition-colors"
            >
              {isSignIn ? "Sign In" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-4">
            {isSignIn ? "New here? " : "Already have an account? "}
            <button
              onClick={() => setIsSignIn(!isSignIn)}
              className="text-purple-600 font-medium hover:underline"
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
