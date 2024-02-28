import {createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase'

// create new context which will be used to store anf chare user information
const AuthContext = createContext();

//component responsible for managing authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    // sets up listener to observe changes in users authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user)=> {
            setUser(user)
        })
        // unsubcribe is a cleaunup function ensures listener is detached when the componenet is not in use
        return () => unsubscribe()
    }, []);

    // provide 'user' state as value to the context makign it acessible to our components pages )
    return (
        <AuthContext.Provider value={{ user }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}