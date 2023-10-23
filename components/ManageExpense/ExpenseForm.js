import {Alert, StyleSheet, Text, TextInput, View} from "react-native";
import Input from "./Input";
import {GlobalStyles} from "../../constants/styles";
import {useContext, useState} from "react";
import Button from "../UI/Button";
import {useNavigation} from "@react-navigation/native";
import {ExpensesContext} from "../../store/expenses-context";

function ExpenseForm({onCancel, onSubmit,submitButtonLabel, defaultValues}) {
    const expensesCtx = useContext(ExpensesContext);
    // const [amountValue, setAmountValue] = useState('');
    const [inputValues, setInputValues] = useState({
        amount: {
            value: defaultValues ? defaultValues.amount.toString() : '',
            isValid: true
        },
        date: {
            value: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',
            isValid: true
        },
        title: {
            value: defaultValues ? defaultValues.title : '',
            isValid: true
        }
    });

    function inputChangeHandler(inputIdentifier,enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: {value: enteredValue, isValid: true}
            }
        });
    }
    function submitHandler() {
        const expenseData = {
            amount: +inputValues.amount.value,
            date: new Date(inputValues.date.value),
            title: inputValues.title.value
        };
        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !=='Invalid Date';
        const titleIsValid = expenseData.title.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !titleIsValid) {
            //show feedback
            setInputValues((currentInputs) => {
                return {
                    amount: {value: currentInputs.amount.value, isValid: amountIsValid},
                    date: {value: currentInputs.date.value, isValid: dateIsValid},
                    title: {value: currentInputs.title.value, isValid: titleIsValid}
                }
            })
            return;
        }
        onSubmit(expenseData);
    }

    const formIsValid = !inputValues.amount.isValid || !inputValues.date.isValid || !inputValues.title.isValid;


    return (
        <View style={styles.formContainer}>
            <Text style={styles.title}>Your expense</Text>
            <View style={styles.inputsRow}>
                <Input label="Amount" style={styles.rowInput} invalid={!inputValues.amount.isValid} textInputConfig={
                    {
                        keyboardType:'decimal-pad',
                        onChangeText: inputChangeHandler.bind(this, 'amount'),
                        value: inputValues.amount.value
                    }
                }/>
                <Input label="Date" style={styles.rowInput} invalid={!inputValues.date.isValid} textInputConfig={
                    {
                        placeholder:'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(this, 'date'),
                        value: inputValues.date.value
                    }
                }/>
            </View>

            <Input label="Title" invalid={!inputValues.title.isValid} textInputConfig={
                {
                    multiline: true,
                    onChangeText: inputChangeHandler.bind(this, 'title'),
                    value: inputValues.title.value
                }
            }/>
            {formIsValid && <Text style={styles.errorText}>Please check your input values</Text>}
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
    },
    errorText: {
        color: GlobalStyles.colors.error500,
        textAlign: 'center',
        marginVertical: 20
    }
})