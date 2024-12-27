import { createContext, useState } from 'react';

export const UserContext = createContext<any>(null);
interface Props {
    children: any;
    defaultLocale: string;
};

export const UserContextProvider = ({ children, defaultLocale }: Props) => {
   const [userInfo, setUserInfo] = useState(null);
   const [isAuth, setIsAuth] = useState(false);
   const [locale, setLocale] = useState(defaultLocale); 
   const login = (name:string, pass: string) => {
       fetch("/api/login", {
           method: "POST",
           body: JSON.stringify({name:name, pass: btoa(pass)}),
       }).then(() => {
           setIsAuth(true);
           // setUserInfo(res.user)
       });
   };
   
   const logout = () => {
      fetch('/api/logout').then(() => {
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
