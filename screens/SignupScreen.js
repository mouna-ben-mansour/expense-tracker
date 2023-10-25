import AuthContent from '../components/Auth/AuthContent';
import {createUser} from "../util/auth";
import {useState} from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function SignupScreen() {
    const[isAuthenticating, setIsAuthenticating] =useState(false);
    async function signupHandler({email,password}){
        setIsAuthenticating(true);
        await createUser(email,password);
        setIsAuthenticating(false);
    }

    if(isAuthenticating) {
        return <LoadingOverlay/>
    }
    return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;