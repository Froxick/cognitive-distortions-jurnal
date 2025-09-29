import { StyleSheet } from "react-native";
import { ColorTheme } from "../../style/Colors";

export const StaticWidgetStyles = StyleSheet.create({
    container: {
        width: 340,
        height: 110,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
        flexDirection: 'row',
        gap: 70,
        justifyContent: 'center'
    },
    textTitle: {
        color: ColorTheme.main_color,
        fontSize: 34,
        fontWeight: '700'
    },
    descText: {
        color: '#898989',
        
    },
    contentContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})