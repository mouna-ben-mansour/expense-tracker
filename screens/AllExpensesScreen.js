import {StyleSheet,View,Text} from "react-native";
import ExpensesList from "../components/ExpensesOutput/ExpensesList";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";

function AllExpensesScreen() {
    return (
        <View style={styles.container}>
            <ExpensesOutput expensesPeriodName="Total"/>
        </View>
    )
}
export default AllExpensesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})