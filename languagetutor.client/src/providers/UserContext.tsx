import React, { createContext, useState } from 'react';

export const UserContext = createContext(null); 

export const UserContextProvider = ({ children, locale, setLocale }) => {
   const [userInfo, setUserInfo] = useState(null);
   const [isAuth, setIsAuth] = useState(false);

   const login = (name:string, pass: string) => {
       fetch("/api/login", {
           method: "POST",
           body: JSON.stringify({name:name, pass: btoa(pass)}),
       }).then((res) => {
           setIsAuth(true);
           setUserInfo(res.user)
       });
   };
   
   const logout = () => {
      fetch('/api/logout').then((res) => {
           setIsAuth(false);
           setUserInfo(null);
       });
   };

   const value = {
       userInfo,
       setUserInfo,
       isAuth,
       setIsAuth,
       login,
       logout,
       locale,
       setLocale, 
   };

   return (
     <UserContext.Provider value={value}> {children} </UserContext.Provider> 
   );
};


export default UserContext;
