import React, { useContext, useEffect, useState } from 'react';
import { ModeContext } from './ModeContext';
import { AuthContext } from '../Contexts/AuthContext';


const ModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);
  const { user } = useContext(AuthContext);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);

    if (user?.email) {
      fetch('http://localhost:5000/mode', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: user.email, darkMode: newMode }),
      }).catch((err) => console.error('Failed to update mode', err));
    }
  };

 
  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/mode/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.darkMode !== undefined) {
            setDarkMode(data.darkMode);
          }
        })
        .catch((err) => console.error('Failed to fetch mode', err));
    }
  }, [user]);

  const mode = {
    darkMode,
    setDarkMode,
    toggleDarkMode,
  };

  return (
    <ModeContext.Provider value={mode}>
      {children}
    </ModeContext.Provider>
  );
};

export default ModeProvider;
