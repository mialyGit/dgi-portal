import React, { useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../../../auth-context/auth.context";
import AuthApi from "../../../utils/auth";

const SignOut = () => {
    let { userSession , setUserSession } = useAuth();
    
    useEffect(()=>{

        const handleLogout = () => {
            AuthApi.Logout(userSession)
            .catch((err)=> console.log(err))
            .finally(()=>{
                setUserSession({});
                localStorage.clear();
                // localStorage.removeItem("user");
            })
        };
    
        handleLogout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <Redirect to="/" />
    );
}

export default SignOut;