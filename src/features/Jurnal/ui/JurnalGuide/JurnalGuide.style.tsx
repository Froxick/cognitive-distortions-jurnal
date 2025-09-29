import { StyleSheet } from "react-native";

export const JurnalGuideStyles = StyleSheet.create({
        card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 25,
        width: 360,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#5d34a9',
        marginBottom: 15,
    },
    cardText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 15,
    },
    exampleContainer: {
        marginTop: 15,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    stepTextContainer: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 17,
        fontWeight: '600',
        color: '#5d34a9',
        marginBottom: 3,
    },
    stepDescription: {
        fontSize: 15,
        color: '#555',
    },

})