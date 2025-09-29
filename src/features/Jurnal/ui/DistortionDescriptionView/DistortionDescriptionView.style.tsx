import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";

export const  DistortionDescriptionViewStyles = StyleSheet.create({
     container: {
        maxHeight: '90%', 
        width: '100%',
    },
    contentContainer: {
        padding: 16,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        marginTop: 10,
        fontSize: 18,
        color: ColorTheme.text_main,
        textAlign: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: ColorTheme.gray_light,
    },
    icon: {
        marginRight: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: ColorTheme.text_main,
    },
    description: {
        fontSize: 16,
        lineHeight: 24,
        color: ColorTheme.text_main,
        marginBottom: 20,
    },
    section: {
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ColorTheme.text_main,
        marginBottom: 8,
    },
    exampleCard: {
        backgroundColor: ColorTheme.gray_light,
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    exampleText: {
        flex: 1,
        marginLeft: 10,
        fontStyle: 'italic',
        color: ColorTheme.gray_dark,
    },
    solutionCard: {
        backgroundColor: '#907cb5ff',
        borderRadius: 8,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    solutionText: {
        flex: 1,
        marginLeft: 10,
        color: 'white',
    },
})