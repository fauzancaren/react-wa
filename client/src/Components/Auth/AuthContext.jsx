import React, {createContext,useContext,useState} from "react";

const AuthContext = createContext(null)

export const useAuth = () => useContext(AuthContext)

export function AuthProvider({children}){
    const [user,setUser] = useState()

    const login = (userCredentials) =>{
        setUser({id: '1',name: 'John Doe'})
    }

    const logout = () => {
        setUser(null)
    }
 
    const value = {
        user,
        login,
        logout
    }
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}