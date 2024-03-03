import {createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase.js'
import Spinner from 'react-bootstrap/Spinner';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { signup } from "../services/users";
import { getUser } from "../services/users";

// create new context which will be used to store anf chare user information
const AuthContext = createContext();

//component responsible for managing authentication state
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [mongoUser, setMongoUser] = useState(null)
    const [isFetching, setIsFetching] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    const storeUserDataMongoDB = (data) => {
        setMongoUser(data)
    }

    const signUpAuth = async (email, password, name, status) => {
        setIsLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const firebase_id = auth.currentUser.uid
            const result = await signup(firebase_id, name, email, status)
            setMongoUser(result.user)
            setIsLoading(false)
            return { success: true };
        } catch (error) {
            setIsLoading(false)
            if (error.code === "auth/email-already-in-use") {
                return { success: false, errorType: "emailInUse", message: "Email is already in use. Please try logging in instead." };
            } else {
                console.log(error);
                return { success: false, errorType: "unknown", message: "Sorry, something went wrong. Please try again." };
            }
        }
    }

    const logInAuth = async (email, password) => {
        setIsLoading(true)
        try {
            await signInWithEmailAndPassword(auth, email, password);
            const firebase_id = auth.currentUser.uid
            const result = await getUser(firebase_id)
            setMongoUser(result.user)
            setIsLoading(false)
            return { success: true };  
        } catch {
            setIsLoading(false)
            return { success: false, errorType: "invlidLoginDetails", message: "You entered a wrong username or password." };
        }
    }

    const signOutAuth = async () => {
        setIsLoading(true)
        try {
            await auth.signOut();
            setIsLoading(false)
            setMongoUser(null)
            return { success: true };  
        } catch {
            setIsLoading(false)
            return { success: false, errorType: "erroLogout", message: "Unable to logout." };
        }
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
        <AuthContext.Provider value={{ user, mongoUser, signUpAuth, logInAuth, signOutAuth, isLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}