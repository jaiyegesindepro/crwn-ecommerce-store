import { createContext, useState, useEffect } from "react";
import { auth } from "../utils/firebase/firebase.utils";

import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";
export const UserContext = createContext ({
    currentUser: null,
    setCurrentUser: () => null,
});

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser };

    //signOutUser()
        
    useEffect (() => {
       const unsubscibe = onAuthStateChangedListener((user) => {
        if (user) {
            createUserDocumentFromAuth(user);
        }
        setCurrentUser(user);
       });
        
       return unsubscibe
    },[]);

    return <UserContext.Provider value={value}>{ children }</UserContext.Provider>
};

