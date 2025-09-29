import { StyleSheet } from "react-native";

export const AuthInputStyles = StyleSheet.create({
    container: {
        marginVertical: 10,
        width: 250, 
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 15, 
        paddingVertical: 0,   
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        width: '100%',        
    },
    focusedContainer: {
        borderColor: '#0066cc',
        borderWidth: 1.5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    input: {
        flex: 1,              
        height: '100%',       
        fontSize: 16,
        color: '#333',
        paddingLeft: 10,      
        paddingVertical: 0,   
        margin: 0,           
        minWidth: 100,        
    },
    icon: {
        marginRight: 5,      
    },eyeIcon: {
        padding: 5,
        marginLeft: 5,
    },
    errorContainer: {
        borderColor: '#ff3b30', 
        borderWidth: 1.5,
        shadowColor: '#ff3b30',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
})