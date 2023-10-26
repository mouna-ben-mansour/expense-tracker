import {StyleSheet, View} from "react-native";
import {useContext, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";
import {deleteExpense, storeExpense, updateExpense} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function ManageExpenseScreen({route, navigation}) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const expensesCtx = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    const selectedExpense = expensesCtx.expenses.find(expense => expense.id === expenseId);

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing])

    async function deleteExpenseHandler() {
        setIsSubmitting(true);
        try {
            await deleteExpense(expenseId)
            expensesCtx.deleteExpense(expenseId);
            navigation.goBack();
        } catch (error) {
            setError('Could not delete expense!');
        }
        setIsSubmitting(false);
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(expenseData) {
        setIsSubmitting(true);
        try {
            if(isEditing) {
                expensesCtx.updateExpense( expenseId, expenseData);
                await updateExpense(expenseId, expenseData)
            } else {
                const id = await storeExpense(expenseData);
                expensesCtx.addExpense({...expenseData, id: id});
            }
            navigation.goBack();
        } catch (error) {
            setError('Could not save expense!');
            setIsSubmitting(false);
        }

    }

    if (error && !isSubmitting) {
        return <ErrorOverlay message={error}/>
    }
    if (isSubmitting) {
        return <LoadingOverlay/>
    }

    return(
        <View style={styles.container}>
            <ExpenseForm onCancel={cancelHandler} onSubmit={confirmHandler} submitButtonLabel={isEditing ? 'Update' : 'Add'} defaultValues={selectedExpense}/>

            { isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton icon='trash'
                                color={GlobalStyles.colors.error50}
                                size={36}
                                onPress={deleteExpenseHandler}/>
                </View>
            }
        </View>
    )

}
export default ManageExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    },

})