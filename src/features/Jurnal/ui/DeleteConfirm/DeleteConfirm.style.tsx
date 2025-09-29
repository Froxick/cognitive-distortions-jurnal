import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";

export const DeleteConfirmStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems:'center'
    },
    textContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        marginBottom: 40,
        marginTop: 30
    },
    text: {
        fontSize: 24,
        color: '#2a2a2aff'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 15,
        marginBottom: 15
    },
    acceptButton : {
        backgroundColor: '#ffdfdfff',
        padding: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
         shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 2, 
    },
    cancelButton : {
        padding: 10,
        width: 120,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d1d1d1ff',
        borderRadius: 10,
         shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 2, 
    }
})