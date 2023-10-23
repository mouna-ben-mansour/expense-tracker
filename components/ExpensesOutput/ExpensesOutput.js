import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {StyleSheet, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";

function ExpensesOutput({expenses, expensesPeriodName}) {
    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriodName}/>
            <ExpensesList expenses={expenses}/>
        </View>
    )
}
export default ExpensesOutput;

const styles = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary800,
        flex: 1
    },

})