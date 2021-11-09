import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitialize from "../Pages/Firebase/firebaseInit";
firebaseInitialize();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = getAuth();


    // register a user -----------------------------------------------------------
    const handleRegister = (email , password) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
               setError(errorMessage);
            })

            .finally( () => setIsLoading(false));
            
    };

    //handle sign in-----------------------------------------------------------
    const handleSignIn = (email , password , location , history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from ||'/';
                history.replace(destination);
                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            })

            .finally( () => setIsLoading(false))
    }

    // obsserver user state tract uses (when login set user info)------------------------
    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
            setIsLoading(false);
        })
        
        return () => unsubscribed;
    }, []);

    // Logout user------------------------------------------------
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            }).catch((error) => {
                setError(error.message)
            })
            .finally( () => setIsLoading(false))
    }
    return {
        user,
        handleRegister,
        handleSignOut,
        handleSignIn,
        isLoading,
        error
    }
}
export default useFirebase;