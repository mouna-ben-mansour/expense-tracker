import {FlatList, Text, View} from "react-native";

function ExpensesList({ expenses }) {
    function renderExpenseItem(itemData) {
        return (
            <Text>{itemData.item.title}</Text>
        )
    }
    return(
        <View>
            <FlatList data={expenses} keyExtractor={(expense) => expense.id} renderItem={renderExpenseItem}/>
        </View>
    )
}
export default ExpensesList;