import { createContext, useState } from 'react';

export const UserContext = createContext(null);
interface Props {
    children: any;
    locale: string;
    setLocale: (loc: string) => void;
};

export const UserContextProvider = ({ children, locale, setLocale }: Props) => {
   const [userInfo, setUserInfo] = useState(null);
   const [isAuth, setIsAuth] = useState(false);

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
