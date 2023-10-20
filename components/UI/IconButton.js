import {Pressable, View,StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

function IconButton({icon, color, onPress}) {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => pressed && styles.pressed }>
            <View style={styles.buttonContainer}>
             <Ionicons name={icon} size={24} color={color} />
            </View>
        </Pressable>
    )
}

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.5
    },
    buttonContainer: {
        borderRadius: 24,
        padding:6,
        marginHorizontal: 8,
        marginVertical: 2
    }

})