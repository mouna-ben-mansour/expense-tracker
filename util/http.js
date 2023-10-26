import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const BACKEND_URL = 'https://expense-tracker-app-1d31b-default-rtdb.europe-west1.firebasedatabase.app';

async function fetchToken(){
    return await AsyncStorage.getItem('token');
}

export async function storeExpense(expenseData) {
    const token = await fetchToken();
    const response = await axios.post(BACKEND_URL +'/expenses.json?auth=' + token, expenseData);
    const id = response.data.name; // auto generated id by firebase
    return id;
}

export async function fetchExpenses() {
    const token = await fetchToken();
    const response = await axios.get(BACKEND_URL +'/expenses.json?auth=' + token);
    const expenses = [];
    for (const key in response.data) {
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            title: response.data[key].title,
        }
        expenses.push(expenseObj);
    }
    return expenses;
}

export async function updateExpense(id, expenseData){
    const token = await fetchToken();
    return axios.put(BACKEND_URL + `/expenses/${id}.json?auth=${token}`, expenseData);
}
export async function deleteExpense(id){
    const token = await fetchToken();
    return axios.delete(BACKEND_URL + `/expenses/${id}.json?auth=${token}`);
}