import {createContext, useReducer, useState} from "react";

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({title, amount, date}) => {},
    deleteExpense: (id) => {},
    updateExpense: (id, {title, amount, date}) => {}
})

function ExpensesContextProvider({children}) {
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