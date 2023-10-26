import AuthContent from '../components/Auth/AuthContent';
import {createUser} from "../util/auth";
import {useState} from "react";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import {Alert} from "react-native";

function SignupScreen() {
    const[isAuthenticating, setIsAuthenticating] =useState(false);
    async function signupHandler({email,password}){
        setIsAuthenticating(true);
        try {
            await createUser(email,password);
        } catch(error){
            Alert.alert('Registration failed!', 'Could not create user, please check your input.')
        }

        setIsAuthenticating(false);
    }

    if(isAuthenticating) {
        return <LoadingOverlay/>
    }
    return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;