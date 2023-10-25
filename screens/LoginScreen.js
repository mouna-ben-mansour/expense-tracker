import AuthContent from '../components/Auth/AuthContent';
import {useState} from "react";
import { login} from "../util/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function LoginScreen() {
    const[isAuthenticating, setIsAuthenticating] =useState(false);
    async function loginHandler({email,password}){
        setIsAuthenticating(true);
        await login(email,password);
        setIsAuthenticating(false);
    }

    if(isAuthenticating) {
        return <LoadingOverlay/>
    }
    return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;