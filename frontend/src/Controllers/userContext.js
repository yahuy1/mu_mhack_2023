import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    setPersistence,
    browserLocalPersistence,
    } from 'firebase/auth';

import { auth, app } from '../Configs/firebase';


export const UserContext = createContext({});

export const useUserContext = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (res) => {
      // if (res) {
      //   setUser(res.user);
      // } else {
      //   setUser(null);
      // }
      setUser(res);
      navigate("/feed");
      setError("");
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // const registerUser = (email, password, name) => {
  //   setLoading(true);
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then(() =>
  //       updateProfile(auth.currentUser, {
  //         displayName: name,
  //       })
  //     )
  //     .then((res) => console.log(res))
  //     .catch((err) => setError(err.message))
  //     .finally(() => setLoading(false));
  // };

  // const signInUser = (email, password) => {
  //   setLoading(true);
  //   signInWithEmailAndPassword(auth, email, password)
  //     .then((res) => console.log(res.user.uid))
  //     .catch((err) => setError(err.code))
  //     .finally(() => setLoading(false));
  // };
  const signInUser = (email, password) => {
    setLoading(true);
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((res) => {
          setLoading(false);
          console.log(res.user);
          resolve(res.user);
          setUser(res.user)
        })
        .catch((err) => {
          setLoading(false);
          setError(err.code);
          reject(err);
        });
    });
  };

  const logoutUser = () => {
    console.log(auth.currentUser.uid);
    setLoading(true);
    signOut(auth);
    setLoading(false);
  };


  const contextValue = {
    user,
    loading,
    error,
    signInUser,
//    registerUser,
    logoutUser
//    forgotPassword,
  };
  return (
    loading ? <h2> Loading ... </h2> : <UserContext.Provider value={contextValue}>{!loading && children}</UserContext.Provider>
  );
};