import {createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase.js'
import Spinner from 'react-bootstrap/Spinner';



// create new context which will be used to store anf chare user information
const AuthContext = createContext();

//component responsible for managing authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [mongoUser, setMongoUser] = useState(null)
    const [isFetching, setIsFetching] = useState(true)

    const storeUserDataMongoDB = (data) => {
        setMongoUser(data)
    }

    // sets up listener to observe changes in users authentication state
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user)=> {

            if(user){
                setUser(user)
                setIsFetching(false)
                return
            }

            setUser(null)
            setIsFetching(false)
        })
        // unsubcribe is a cleaunup function ensures listener is detached when the componenet is not in use
        return () => unsubscribe()
    }, []);

    if (isFetching) {
        return (
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        )
    }

    // provide 'user' state as value to the context makign it acessible to our components pages )
    return (
        <AuthContext.Provider value={{ user, mongoUser, storeUserDataMongoDB }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}