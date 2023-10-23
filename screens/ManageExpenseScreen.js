import {StyleSheet,View,Text} from "react-native";
import {useContext, useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import Button from "../components/UI/Button";
import {GlobalStyles} from "../constants/styles";
import {ExpensesContext} from "../store/expenses-context";


function ManageExpenseScreen({route, navigation}) {
    const expensesCtx = useContext(ExpensesContext);
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing])

    function deleteExpenseHandler() {
        console.log(expenseId);
        expensesCtx.deleteExpense(expenseId);
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {
        if(isEditing) {
            expensesCtx.updateExpense( expenseId, {title:'book', amount: 99.85, date: new Date('2023-10-23')});
        } else {
            expensesCtx.addExpense({title:'book', amount: 25.85, date: new Date('2023-10-23')});
        }
        navigation.goBack();
    }

    return(
        <View style={styles.container}>
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode='flat' onPress={cancelHandler}> Cancel </Button>
                <Button style={styles.button} onPress={confirmHandler}> {isEditing ? 'Update' : 'Add'}</Button>
            </View>
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal:8
    }
})