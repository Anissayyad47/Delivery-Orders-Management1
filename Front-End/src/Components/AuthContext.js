import { createContext, useState,useEffect } from "react";

export const AuthContext =createContext();
export const AuthProvide=(props)=> {
    const [userId, setUserId] = useState(localStorage.getItem("userId") || null);
    const [userName, setUserName] = useState(localStorage.getItem("userName") || null);
    const [sellerId, setSellerId] = useState(localStorage.getItem("sellerId") || null);
    const [sellerName, setSellerName] = useState(localStorage.getItem("sellerName") || null);


    useEffect(() => {
        localStorage.setItem("userId", userId);
        localStorage.setItem("userName", userName);
    }, [userId, userName]);

    useEffect(() => {
        localStorage.setItem("sellerId", sellerId);
        localStorage.setItem("sellerName", sellerName);
    }, [sellerId, sellerName]);

    const LogOut = () => {
        setUserId(null);
        setUserName(null);
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
    };
    return(

        <AuthContext.Provider value={{userId,userName,sellerId,sellerName,setUserId,LogOut,setUserName,setSellerId,setSellerName}}>
            {props.children}
        </AuthContext.Provider>
    )
}
