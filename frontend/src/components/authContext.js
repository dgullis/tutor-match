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
    const [idToken, setIdToken] = useState(null)

    const storeUserDataMongoDB = (data) => {
        setMongoUser(data)
    }

    const signUpAuth = async (email, password, name, status, safeguarding) => {
        setIsLoading(true)
        try {
            await createUserWithEmailAndPassword(auth, email, password)
            const firebase_id = auth.currentUser.uid
            const result = await signup(firebase_id, name, email, status, safeguarding)
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
            const result = await getUser(firebase_id, idToken)
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
    // refreshed state of user and mongoUSer
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setIsFetching(true);
    
            if (user) {
                setUser(user);
                try {
                    const idToken = await user.getIdToken();
                    setIdToken(idToken);
    
                    const firebase_id = user.uid;
                    const result = await getUser(firebase_id, idToken);
                    setMongoUser(result.user);
                } catch (error) {
                    console.error("Error fetching user details from MongoDB: ", error);
                    setMongoUser(null);
                } finally {
                    setIsFetching(false);
                }
            } else {
                setUser(null);
                setMongoUser(null);
                setIsFetching(false);
            }
        });
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

    // provide 'user' and 'mongoUser' state as value to the context making it acessible to our components pages )
    return (
        <AuthContext.Provider value={{ user, mongoUser, signUpAuth, logInAuth, signOutAuth, isLoading, idToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    return useContext(AuthContext)
}