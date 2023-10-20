import {StyleSheet,View,Text} from "react-native";

function ManageExpenseScreen() {
    return (
        <View style={styles.container}>
            <Text>All Expenses</Text>
        </View>
    )
}
export default ManageExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex:1
    }
})