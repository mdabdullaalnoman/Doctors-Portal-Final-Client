import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { useEffect, useState } from "react";
import firebaseInitialize from "../Pages/Firebase/firebaseInit";
firebaseInitialize();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const auth = getAuth();


    // register a user -----------------------------------------------------------
    const handleRegister = (email, password, name, history) => {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const newUser = { email, displayName: name };
                setUser(newUser);

                // user profile update ------------------------------------
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                    setError('')
                });
                
                history.replace('/');
                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            })

            .finally(() => setIsLoading(false));

    };

    //handle sign in-----------------------------------------------------------
    const handleSignIn = (email, password, location, history) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const destination = location?.state?.from || '/';
                history.replace(destination);
                setError('');
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setError(errorMessage);
            })

            .finally(() => setIsLoading(false))
    }

    // handle google sing in --------------------------------------------
    const handleGoogleSignIn = (location, history) => {
        setIsLoading(true);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                const destination = location?.state?.from;
                history.replace(destination);
                setError('');
            }).catch((error) => {
                setError(error.message);
            }).finally(() => setIsLoading(false))
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
            .finally(() => setIsLoading(false))
    }
    return {
        user,
        handleRegister,
        handleSignOut,
        handleSignIn,
        handleGoogleSignIn,
        isLoading,
        error
    }
}
export default useFirebase;