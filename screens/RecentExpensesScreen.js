import {StyleSheet,View,Text} from "react-native";
import ExpensesList from "../components/ExpensesOutput/ExpensesList";
import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import {useContext, useEffect, useState} from "react";
import {ExpensesContext} from "../store/expenses-context";
import {getDateMinusDays} from "../util/date";
import {fetchExpenses} from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";

function RecentExpensesScreen() {
    const [isFetching, setIsFetching] = useState(true);
    const expensesCtx = useContext(ExpensesContext);
    useEffect(() => {
        async function getExpenses(){
            setIsFetching(true);
           const expenses= await fetchExpenses();
            setIsFetching(false);
           expensesCtx.setExpenses(expenses);
        }
        getExpenses();
    }, []);

    if (isFetching) {
        return <LoadingOverlay/>
    }
    const recentExpenses = expensesCtx.expenses.filter((expense)=> {
        const today = new Date();
        const date7daysAgo = getDateMinusDays(today,7);
        return (expense.date >= date7daysAgo) && (expense.date <= today);
    })
    return (
        <View style={styles.container}>
            <ExpensesOutput expenses={recentExpenses} expensesPeriodName='Last 7 days' fallbackText="No expenses registred for the last 7 days"/>
        </View>
    )
}
export default RecentExpensesScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})