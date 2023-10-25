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
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function BottomTabNavigation() {
    return (
        <Tab.Navigator screenOptions={({navigation}) => ({
            headerStyle: { backgroundColor: GlobalStyles.colors.primary500},
            headerTintColor: 'white',
            tabBarStyle: { backgroundColor:GlobalStyles.colors.primary500},
            tabBarActiveTintColor: GlobalStyles.colors.accent500,
            tabBarInactiveTintColor: GlobalStyles.colors.primary50,
            headerRight: ({tintColor}) => {
                return <IconButton icon='add' color={tintColor} onPress={()=>{navigation.navigate('ManageExpense')}}/>
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
export default function App() {

  return (
    <>
      <StatusBar style="light" />
        <ExpensesContextProvider>
          <NavigationContainer>
              <AuthStack />
          </NavigationContainer>
        </ExpensesContextProvider>
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
});
