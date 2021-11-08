import { useEffect, useState } from "react";
import firebaseInitialize from "../Pages/Firebase/firebaseInit";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
firebaseInitialize();

const useFirebase = () => {
    const [user, setUser] = useState({});
    const auth = getAuth();


    // register a user -----------------------------------------------------------
    const handleRegister = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    };

    // tract uses (when login set user info)------------------------
    useEffectL(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser({})
            }
        });
    }, []);

    // Logout user------------------------------------------------
    const handleSignOut = () => {
        signOut(auth)
            .then(() => {
                setUser({})
            }).catch((error) => {
                // An error happened.
            });
    }
    return {
        user,
        handleRegister,
        handleSignOut
    }
}
export default useFirebase;