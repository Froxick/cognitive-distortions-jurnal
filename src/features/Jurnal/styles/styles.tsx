import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../style/Colors";


const baseStyles = StyleSheet.create({
    container: {
        marginVertical: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    buttonText: {
        color: 'white',
        fontWeight: '500',
    },
});

export const EmotionSelectorStyles = StyleSheet.create({
    ...baseStyles,
    container: {
        marginBottom: 15,
    },
    titleText: {
        fontSize: 16,
        fontWeight: '700',
        color: ColorTheme.gray_dark,
        marginBottom: 12,
        paddingLeft: 8,
        borderLeftWidth: 3,
        borderLeftColor: ColorTheme.main_light,
    },
    selectorButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 16,
        borderWidth: 1,
        borderColor: ColorTheme.gray_light,
        shadowColor: '#d1d5db',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    selectorIcon: {
        marginRight: 12,
        backgroundColor: ColorTheme.main_light + '20',
        borderRadius: 10,
        padding: 8,
    },
    selectorText: {
        flex: 1,
        fontSize: 16,
        color: ColorTheme.gray_dark,
        fontWeight: '500',
    },
    selectedContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 15,
    },
    emotionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorTheme.main_light,
        borderRadius: 20,
        paddingVertical: 8,
        paddingHorizontal: 14,
        marginRight: 10,
        marginBottom: 10,
        shadowColor: ColorTheme.main_light,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
    },
    emotionContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    emotionName: {
        color: 'white',
        fontSize: 14,
        fontWeight: '500',
        marginRight: 8,
    },
    intensityBadge: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        borderRadius: 10,
        width: 26,
        height: 26,
        justifyContent: 'center',
        alignItems: 'center',
    },
    intensityText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 14,
    },
    deleteButton: {
        marginLeft: 8,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 12,
        width: 24,
        height: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
});


export const pickerStyles = StyleSheet.create({
    ...baseStyles,
    container: {
        backgroundColor: ColorTheme.back_color,
        borderRadius: 16,
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ColorTheme.gray_dark,
        marginBottom: 15,
        textAlign: 'center',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    emotionCard: {
        backgroundColor: ColorTheme.gray_light,
        borderRadius: 12,
        padding: 15,
        margin: 6,
        minWidth: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 2,
        
    },
    emotionSelected: {
      backgroundColor : ColorTheme.main_color,

    },
    emotionText: {
        color: ColorTheme.gray_dark,
        fontWeight: '500',
        
    },
    emotionTextSelected: {
        fontWeight: '500',
        color: 'white'
    },
    pickerContainer: {
        paddingVertical: 10,
    },
    selectedTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        color: ColorTheme.main_color,
        textAlign: 'center',
        marginBottom: 20,
    },
    intensityLabel: {
        color: ColorTheme.gray_dark,
        marginBottom: 10,
        textAlign: 'center',
    },
    intensityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    intensityItem: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: ColorTheme.gray_light,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    intensitySelected: {
        backgroundColor: ColorTheme.main_color,
        transform: [{ scale: 1.1 }],
    },
    intensityText: {
        color: ColorTheme.gray_dark,
        fontWeight: 'bold',
    },
    intensityTextSelected: {
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: ColorTheme.gray_medium,
    },
    confirmButton: {
        backgroundColor: ColorTheme.main_color,
    },
});


export const updateStyles = StyleSheet.create({
    ...baseStyles,
    container: {
        backgroundColor: ColorTheme.back_color,
        borderRadius: 16,
        padding: 25,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: ColorTheme.main_color,
        textAlign: 'center',
        marginBottom: 20,
    },
    intensityLabel: {
        color: ColorTheme.gray_dark,
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 16,
    },
    intensityContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 25,
    },
    intensityItem: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: ColorTheme.gray_light,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 5,
    },
    intensitySelected: {
        backgroundColor: ColorTheme.main_color,
        transform: [{ scale: 1.15 }],
    },
    intensityText: {
        color: ColorTheme.gray_dark,
        fontWeight: 'bold',
        fontSize: 16,
    },
    intensityTextSelected: {
        color: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelButton: {
        backgroundColor: ColorTheme.gray_medium,
    },
    confirmButton: {
        backgroundColor: ColorTheme.main_color,
    },
});