import {createContext, useReducer, useState} from "react";


export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({title, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {title, amount, date}) => {},
    setExpenses: (expenses) => {}
})

// this function receive current state
function expensesReducer (state, action) {
    switch (action.type) {
        case 'ADD':
            // const id = new Date().toString() + Math.random().toString();
            return [action.payload,...state];
        case 'UPDATE':
            const itemIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const item = state[itemIndex];
            const updatedItem = {...item, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[itemIndex] = updatedItem;
            return updatedExpenses;
        case 'DELETE':
            return state.filter((expense)=> expense.id !== action.payload);
        case 'SET':
            const inverted = action.payload.reverse();
            return inverted;
        default:
            return state;
    }
}
function ExpensesContextProvider({children}) {
    // the state that will be managed vy this reducer
    // + dispatch function which we can execute to dispatch a new action to the reducer function
    // which is then able to manipulate the state
    const [expensesState, dispatch] = useReducer(expensesReducer, []);

    function addExpense(expenseData) {
        dispatch({type: 'ADD', payload: expenseData});
    }

    function deleteExpense(id) {
        dispatch({type: 'DELETE', payload: id});
    }

    function updateExpense(id,expenseData) {
        dispatch({type: 'UPDATE', payload: {id: id,data:expenseData}});
    }

    function setExpenses(expenses){
        dispatch({type: 'SET', payload: expenses});
    }
    const value = {
        expenses: expensesState,
        addExpense: addExpense,
        deleteExpense: deleteExpense,
        updateExpense: updateExpense,
        setExpenses: setExpenses
    }
    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
}

export default ExpensesContextProvider;