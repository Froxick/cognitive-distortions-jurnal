import { useState } from "react"
import { StyleSheet, TextInput, View } from "react-native"
import { DistortionCard } from './DistortionCard';
import { Ionicons } from '@expo/vector-icons';

interface DistortionSearchProps {
    value_search: string,
    fnc_search: (query: string) => void
}
export const DistortionSearch = ({value_search,fnc_search} : DistortionSearchProps) => {
    return(
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput style={styles.input} onChangeText={fnc_search} value={value_search} placeholder="Введите название искажения"/>
                <Ionicons 
                    name="search" 
                    size={22} 
                    color="#7e6fa8" 
                    style={styles.icon} 
                />
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 25
    },
    icon: {
        marginLeft: 15
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#b29fde',
        borderRadius: 12,
        backgroundColor: '#fff',
        paddingHorizontal: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    input: {
        flex: 1,
        height: 50,
        paddingVertical: 12,
        fontSize: 16,
        color: '#333',
        paddingRight: 10, 
    }
})