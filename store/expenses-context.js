import {createContext, useReducer, useState} from "react";

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        title: 'book',
        amount: 59,
        date: new Date('2023-10-07')
    },
    {
        id: 'e2',
        title: 'laptop',
        amount: 1440.99,
        date: new Date('2023-10-18')
    },
    {
        id: 'e3',
        title: 'Doctor visit',
        amount: 40,
        date: new Date('2023-10-10')
    },
    {
        id: 'e4',
        title: 'T-shirt',
        amount: 11.50,
        date: new Date('2023-10-17')
    },
    {
        id: 'e5',
        title: 'Food',
        amount: 30,
        date: new Date('2023-10-08')
    }
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({title, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {title, amount, date}) => {}
})

// this function receive current state
function expensesReducer (state, action) {
    switch (action.type) {
        case 'ADD':
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state];
        case 'UPDATE':
            const itemIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const item = state[itemIndex];
            const updatedItem = {...item, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[itemIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        default:
            return state;
    }
}
function ExpensesContextProvider({children}) {
    // the state that will be managed vy this reducer
    // + dispatch function which we can execute to dispatch a new action to the reducer function
    // which is then able to manipulate the state
    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id,expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id,data:expenseData}});
    }
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;