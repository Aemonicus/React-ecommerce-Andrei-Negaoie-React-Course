import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, createUserDocumentFromAuth} from "../utils/firebase/firebase.utils";


// the actual value you want to access
export const UserContext = createContext({
  setCurrentUser: () => null,
  currentUser: null
})


export const UserProvider = ({children}) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser}

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(user => {
      if(user) {
        createUserDocumentFromAuth(user)
      } 

      setCurrentUser(user)
    })

    // cleanup function
    return unsubscribe
  }, [])
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}