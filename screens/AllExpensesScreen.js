import {StyleSheet,View} from "react-native";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext} from "react";
import {ExpensesContext} from "../store/expenses-context";

function AllExpensesScreen() {
    const expensesCtx = useContext(ExpensesContext)
    return (
        <View style={styles.container}>
            <ExpensesOutput expenses={expensesCtx.expenses} expensesPeriodName="Total" fallbackText="No registred expenses found!"/>
        </View>
    )
}
export default AllExpensesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})