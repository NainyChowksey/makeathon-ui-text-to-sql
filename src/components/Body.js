import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Browse from './Browse';
import Login from './Login';
import Metadata from './Metadata';
import { onAuthStateChanged } from 'firebase/auth'; // Listen to Firebase auth state
import { auth } from '../utils/firebase'; // Import Firebase auth instance
import { addUser, removeUser } from '../utils/userSlice';
import BrowseMetadata from "./BrowseMetadata"; // Redux actions

// PrivateRoute Wrapper to protect routes
const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.user); // Access `user` state from Redux

  // If no user exists in the Redux state, redirect to login
  return user ? element : <Navigate to="/" replace />;
};

const Body = () => {
  const dispatch = useDispatch();
  const [isAuthChecked, setIsAuthChecked] = useState(false); // Track whether auth check is complete

  // Load user data on app load or page reload
  useEffect(() => {
    // Monitor auth state changes with Firebase
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        const userData = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || 'Anonymous User',
          photoURL: user.photoURL || null,
        };

        // Add user to Redux state
        dispatch(addUser(userData));

        // Persist user data in localStorage
        localStorage.setItem('authUser', JSON.stringify(userData));
      } else {
        // User is logged out
        dispatch(removeUser()); // Clear Redux user state
        localStorage.removeItem('authUser'); // Clear localStorage
      }

      // Auth check completed
      setIsAuthChecked(true);
    });

    // Cleanup on component unmount (unsubscribe from Firebase observer)
    return () => unsubscribe();
  }, [dispatch]);

  // Define your app router
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <Login />, // Login page
    },
    {
      path: '/browse',
      element: <PrivateRoute element={<Browse />} />, // Protect /browse route
    },
    {
      path: '/metadata',
      element: <PrivateRoute element={<BrowseMetadata />} />, // Protect /metadata route
    },
  ]);

  // Render a loading state while waiting for auth check to complete
  if (!isAuthChecked) {
    return <div className="flex items-center justify-center flex-col gap-4 h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
     <div className="flex"> Loading...</div>
    </div>;
  }

  return (
      <div>
        <RouterProvider router={appRouter} />
      </div>
  );
};

export default Body;