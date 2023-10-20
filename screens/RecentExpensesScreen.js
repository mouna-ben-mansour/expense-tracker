import {StyleSheet,View,Text} from "react-native";
import ExpensesList from "../components/ExpensesOutput/ExpensesList";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function RecentExpensesScreen() {
    return (
        <View style={styles.container}>
            <Text>Recent Expenses</Text>
            <ExpensesOutput expensesPeriodName='Last 7 days'/>
        </View>
    )
}
export default RecentExpensesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})