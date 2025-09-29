import { StyleSheet } from "react-native";
import { ColorTheme } from "../../style/Colors";

export const  DestortionJurnalStyles = StyleSheet.create({
    container: {
        
    },
    infoContainer: {
        
        marginHorizontal: 15,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
        ,textAlign: 'center',
        marginBottom: 40
    },
    header: {
        marginTop: 80,
        marginLeft: 30
    },
    staticContainer: {
        marginTop: 40,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 30,
        flexDirection:'row',
        gap: 30,
        justifyContent: 'center'
    },
    list_container: {
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
        justifyContent:'center', alignItems:'center', marginTop:20, gap: 15, marginBottom: 40,
        backgroundColor: 'white',
        width: 365,
        borderRadius: 10,
        height: 'auto',
        paddingVertical: 30,
        
    },
    list_view : {
        justifyContent: 'center',
        gap: 20
    },
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
    recordsHeader: {
        flexDirection: 'row',
    },
    blurButtonIcon: {
        position: 'relative',
        left: 25,
        top: -7,
        backgroundColor: '#e5e5fcff',
        justifyContent: 'center',
        width: 40,
        alignContent: 'center',
        alignItems: 'center',
        borderRadius: '100%'
    },
    blurOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.92)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        borderRadius: 10,
    },
    blurContent: {
        alignItems: 'center',
    },
    blurText: {
        color: '#6a45bfff',
        marginTop: 10,
        fontSize: 16,
    },
     absolute: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 1,
    },

})