import {StyleSheet, Text, TextInput, View} from "react-native";
import Input from "./Input";
import {GlobalStyles} from "../../constants/styles";
import {useContext, useState} from "react";
import Button from "../UI/Button";
import {useNavigation} from "@react-navigation/native";
import {ExpensesContext} from "../../store/expenses-context";

function ExpenseForm({onCancel, onSubmit,submitButtonLabel}) {
    const expensesCtx = useContext(ExpensesContext);
    // const [amountValue, setAmountValue] = useState('');
    const [inputValues, setInputValues] = useState({
        amount: '',
        date: '',
        title: ''
    });

    function inputChangeHandler(inputIdentifier,enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            }
        });
    }
    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            title: inputValues.title
        };
        onSubmit(expenseData);
    }


    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Your expense</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount" style={styles.rowInput} textInputConfig={
                    {
                        keyboardType:'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount
                    }
                }/>
                <Input label="Date" style={styles.rowInput} textInputConfig={
                    {
                        placeholder:'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date
                    }
                }/>
            </View>

            <Input label="Title" textInputConfig={
                {
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'title'),
                    value: inputValues.title
                    // autoCapitalize: 'none',
                    // autoCorrect: false, the default value is true
                }
            }/>
            <View style={styles.buttonsContainer}>
                <Button style={styles.button} mode='flat' onPress={onCancel}> Cancel </Button>
                <Button style={styles.button} onPress={submitHandler}> {submitButtonLabel} </Button>
            </View>
        </View>
    );
}

export default ExpenseForm;

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 30
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        fontWeight: 'bold',
        color: GlobalStyles.colors.primary50,
        marginVertical: 30
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    rowInput: {
        flex:1
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        minWidth: 120,
        marginHorizontal:8
    }
})