import {FlatList, Text, View} from "react-native";
import ExpenseItem from "./ExpenseItem";

function ExpensesList({ expenses }) {
    function renderExpenseItem(itemData) {
        return (
            <ExpenseItem {...itemData.item}/>
        )
    }
    return(
        <View>
            <FlatList data={expenses} keyExtractor={(expense) => expense.id} renderItem={renderExpenseItem}/>
        </View>
    )
}
export default ExpensesList;