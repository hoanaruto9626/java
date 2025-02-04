import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext({
    isLoggedIn: false,
    userEmail: null, // Chỉ lưu email
    login: () => {},
    logout: () => {},
});

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        const storedEmail = localStorage.getItem('email');
        if (storedToken && storedEmail) {
            setIsLoggedIn(true);
            setUserEmail(storedEmail);
        }
    }, []);

    const login = (token, email) => {
        localStorage.setItem('authToken', token);
        localStorage.setItem('email', email);
        setIsLoggedIn(true);
        setUserEmail(email);
    };

    const logout = () => {
        localStorage.clear();
        setIsLoggedIn(false);
        setUserEmail(null);
    };

    const value = { isLoggedIn, userEmail, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};