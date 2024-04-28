import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const UseAuth = () => useContext(AuthContext);

function AuthProvider({ children }) {
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    const login = (userCredentials) => {
        const userData = userCredentials; // Simulasi user data
        setUser(userData);
        sessionStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('user');
    };

    useEffect(() => {
        const userData = sessionStorage.getItem('user');
        if (userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const value = {
        user,
        login,
        logout
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
