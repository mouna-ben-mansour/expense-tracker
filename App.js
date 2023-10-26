import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import AllExpensesScreen from "./screens/AllExpensesScreen";
import RecentExpensesScreen from "./screens/RecentExpensesScreen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from '@react-navigation/stack';
import ManageExpenseScreen from "./screens/ManageExpenseScreen";
import { GlobalStyles } from "./constants/styles";
import IconButton from "./components/UI/IconButton";
import ExpensesContextProvider from "./store/expenses-context";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import AuthContextProvider, {AuthContext} from "./store/auth-context";
import {useContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import LoadingOverlay from "./components/UI/LoadingOverlay";
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigation() {
    const authCtx = useContext(AuthContext);
    return (
        <Tab.Navigator screenOptions={({navigation}) => ({
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor:GlobalStyles.colors.primary500},
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            tabBarInactiveTintColor: GlobalStyles.colors.primary50,
            headerRight: ({tintColor}) => {
                return (
                    <View style={styles.buttonsContainer}>
                        <IconButton icon='add' color={tintColor} onPress={()=>{navigation.navigate('ManageExpense')}}/>
                        <IconButton icon='exit' color={tintColor} onPress={authCtx.logout}/>
                    </View>

                )
            }
        })}
        >
            <Tab.Screen name="RecentExpenses" component={RecentExpensesScreen} options={{
                title:'Recent Expenses',
                tabBarLabel: 'Recent',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="hourglass" color={color} size={size} />
                ),
            }}/>
            <Tab.Screen name="AllExpenses" component={AllExpensesScreen} options={{
                title: 'All Expenses',
                tabBarLabel: 'All Expenses',
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="calendar" color={color} size={size} />
                ),
            }}/>
        </Tab.Navigator>
    )
}
function AuthenticatedStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white'}}
        >
            <Stack.Screen name="ExpensesOverview" component={BottomTabNavigation} options={{headerShown:false}}></Stack.Screen>
            <Stack.Screen name="ManageExpense" component={ManageExpenseScreen} options={{
                presentation: 'modal'
            }}></Stack.Screen>
        </Stack.Navigator>
    );
}

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: GlobalStyles.colors.primary100 },
                presentation: 'modal'
            }}
        >
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
    );
}
function Navigation(){
    const authCtx = useContext(AuthContext);
    return (
        <ExpensesContextProvider>
            <NavigationContainer>
                { !authCtx.isAuthenticated && <AuthStack /> }
                { authCtx.isAuthenticated && <AuthenticatedStack /> }
            </NavigationContainer>
        </ExpensesContextProvider>
    );
}
function Root(){
    const authCtx = useContext(AuthContext);
    const [isTryingLogin, setIsTryingLogin] = useState(true);
    useEffect(() => {
        async function fetchToken(){
            const storedToken = await AsyncStorage.getItem('token');
            if(storedToken){
                authCtx.authenticate(storedToken);
            }
            setIsTryingLogin(false)
        }
        fetchToken();
    }, [isTryingLogin]);
    if (isTryingLogin) {
        return <AppLoading/>
    }
    return <Navigation/>;
}
export default function App() {

    return (
        <>
            <StatusBar style="light" />
            <AuthContextProvider>
                <Root/>
            </AuthContextProvider>
        </>
    );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
  },
    buttonsContainer: {
        flexDirection: 'row',
        gap: 10
    }
});
