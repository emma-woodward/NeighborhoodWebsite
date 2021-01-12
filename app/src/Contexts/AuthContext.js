import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../fire';

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}){
    const[currentUser, setCurrentUser] = useState();

    function login(email, password){
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout(){
        return auth.signOut()
    }

    function sendPasswordResetEmail(newPassword){
        return auth.sendPasswordResetEmail(newPassword)
    }

    useEffect(()=>{
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
        })

        return unsubscribe;
    }, [])
    
    const value = {
        currentUser,
        login,
        logout,
        sendPasswordResetEmail
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}