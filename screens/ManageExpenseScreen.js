import {StyleSheet,View,Text} from "react-native";
import {useLayoutEffect} from "react";

function ManageExpenseScreen({route, navigation}) {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing])


    if(isEditing) {
        return(
            <View style={styles.container}>
                <Text>editing : {expenseId}</Text>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text>add</Text>
            </View>
        )
    }

}
export default ManageExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})