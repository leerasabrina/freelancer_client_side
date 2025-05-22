import React, { useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  updateProfile, 
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { toast } from 'react-toastify';

import { AuthContext } from './AuthContext';
import { auth } from '../firebase/firebase.config';

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true);
  const googleProvider = new GoogleAuthProvider();

 
  const saveUserToDB = async (user) => {
    if (!user?.email) return;

    const newUser = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
    };

    try {
      const res = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (data.insertedId) {
        console.log('User saved in database');
      }
    } catch (err) {
      console.error('Failed to save user to database', err);
    }
  };

  // const googleSignin = () => {
  //   return signInWithPopup(auth, googleProvider)
  //     .then(async (result) => {
  //       const user = result.user;
      
  //       await saveUserToDB(user);
  //       setUser({
  //         uid: user.uid,
  //         email: user.email,
  //         displayName: user.displayName,
  //         photoURL: user.photoURL,
  //       });
  //     });
  // };
 

  const googleSignin = async (shouldPostUser = false) => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
  
    if (shouldPostUser) {
      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          name: user.displayName,
        }),
      });
    }
  
    return result;
  };
  



  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const resister = (email, password, name, photo) => {
    if (password.length < 6) {
      toast.error("Password must be at least 6 chars");
      return Promise.reject(new Error("Password too short"));
    } else if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain uppercase");
      return Promise.reject(new Error("No uppercase"));
    } else if (!/[a-z]/.test(password)) {
      toast.error("Password must contain lowercase");
      return Promise.reject(new Error("No lowercase"));
    } else if (!/\d/.test(password)) {
      toast.error("Password must contain a number");
      return Promise.reject(new Error("No number"));
    } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      toast.error("Password must contain a special character");
      return Promise.reject(new Error("No special char"));
    }

    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        await updateProfile(userCredential.user, {
          displayName: name,
          photoURL: photo
        });
        
        const newUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name,
          photoURL: photo,
        };

        
        await saveUserToDB(newUser);

        setUser(newUser);
      });
  };

  const logout = () => {
    setUser(null);
    return signOut(auth);
  };

  const fetchUserFromDB = async (firebaseUser) => {
    if (!firebaseUser?.email) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/users/${firebaseUser.email}`);
      if (res.status === 404) {
        setUser(null);
        return;
      }
      const data = await res.json();

      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("Failed to fetch user from database", error);
      setUser(null);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        fetchUserFromDB(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const userInfo = {
    user,
    setUser,
    login,
    resister,
    logout,
    googleSignin,
    loading,
  };

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
