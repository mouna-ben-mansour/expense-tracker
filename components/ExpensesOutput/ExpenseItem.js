import {View, StyleSheet, Text, Pressable} from "react-native";
import {GlobalStyles} from "../../constants/styles";

function ExpenseItem({title, date, amount}) {
    return (
        <Pressable>
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.title]}>{title}</Text>
                    <Text style={styles.textBase}>{date.toString()}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>{amount}</Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create( {
    expenseItem: {
        padding:12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent:'space-between',
        borderRadius: 6,
        elevation: 4,
        shadowColor: GlobalStyles.colors.primary500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height:1},
        shadowOpacity: 0.4
    },
    textBase: {
        color: GlobalStyles.colors.primary50
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8
    },
    amountContainer:{
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    amount:{
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
})