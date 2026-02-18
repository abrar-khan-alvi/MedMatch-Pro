import React, { createContext, useState, useContext, useEffect } from 'react';
import { USERS } from '../data/users';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Check for stored user on mount (simulate session persistence)
    useEffect(() => {
        const storedUser = localStorage.getItem('medmatch_user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = (email, password) => {
        const foundUser = USERS.find(u => u.email === email && u.password === password);

        if (foundUser) {
            // Remove password from stored object for basic security
            const { password, ...userWithoutPassword } = foundUser;
            setUser(userWithoutPassword);
            localStorage.setItem('medmatch_user', JSON.stringify(userWithoutPassword));
            return { success: true };
        } else {
            return { success: false, message: 'Invalid email or password' };
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('medmatch_user');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
