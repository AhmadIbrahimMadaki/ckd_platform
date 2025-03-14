import React, { createContext, useContext, useState, useEffect } from 'react';

// Example of a simple auth context
const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This will store the logged-in user

  // You can replace this with your authentication logic
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user')); // Assuming you store user in localStorage
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const login = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user)); // Save user to localStorage
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
