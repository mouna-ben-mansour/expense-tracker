import {StyleSheet,View,Text} from "react-native";
import {useLayoutEffect} from "react";
import IconButton from "../components/UI/IconButton";
import {GlobalStyles} from "../constants/styles";

function ManageExpenseScreen({route, navigation}) {
    const expenseId = route.params?.expenseId;
    const isEditing = !!expenseId;

    useLayoutEffect(() => {
        navigation.setOptions({
            title: isEditing ? 'Edit Expense' : 'Add Expense'
        })
    },[navigation, isEditing])

    function deleteExpenseHandler() {
        console.log('delete')
    }

    return(
        <View style={styles.container}>
            <Text>editing : {expenseId}</Text>
            { isEditing &&
                <View style={styles.deleteContainer}>
                    <IconButton icon='trash'
                                color={GlobalStyles.colors.error50}
                                size={36}
                                onPress={deleteExpenseHandler}/>
                </View>
            }
        </View>
    )

}
export default ManageExpenseScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.colors.primary200,
        alignItems: 'center'
    }
})