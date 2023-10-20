import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import {StyleSheet, View} from "react-native";
import {GlobalStyles} from "../../constants/styles";

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
function ExpensesOutput({expenses, expensesPeriodName}) {
    return(
        <View style={styles.container}>
            <ExpensesSummary expenses={DUMMY_EXPENSES} periodName={expensesPeriodName}/>
            <ExpensesList expenses={DUMMY_EXPENSES}/>
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