import { TextInput, View, TouchableOpacity, StyleProp, ViewStyle } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { AuthInputStyles } from "./AuthInputStyle";

interface AuthInputProps {
    value: string,
    onChange: (query: string) => void,
    icon: keyof typeof Ionicons.glyphMap,
    placeHolder: string,
    error?: boolean,
    onFocus?: () => void, 
    secureTextEntry?: boolean
}

export const AuthInput = ({
    value,
    onChange,
    icon,
    placeHolder,
    error = false,
    onFocus,
    secureTextEntry
}: AuthInputProps) => {
    const [isFocused, setIsFocused] = useState(false);
    const [secureTextInput, setSecureTextInput] = useState(secureTextEntry);
    
    const showEyeIcon = secureTextEntry;
    
    const toggleSecureText = () => {
        setSecureTextInput(!secureTextInput);
    };
    
  
    const containerStyle: StyleProp<ViewStyle> = [
        AuthInputStyles.inputContainer,  
        isFocused && AuthInputStyles.focusedContainer,
        error && AuthInputStyles.errorContainer 
    ];
    
    const handleFocus = () => {
        setIsFocused(true);
        if (onFocus) onFocus();
    };
    
    return(
        <View style={AuthInputStyles.container}>
            <View style={containerStyle}>
                <Ionicons 
                    size={22} 
                    name={icon} 
                    style={[
                        AuthInputStyles.icon, 
                        { 
                            color: error 
                                ? '#ff3b30'
                                : isFocused 
                                    ? '#0066cc' 
                                    : '#888' 
                        }
                    ]} 
                />
                <TextInput
                    style={AuthInputStyles.input}
                    onChangeText={onChange}
                    value={value}
                    placeholder={placeHolder}
                    placeholderTextColor="#999"
                    onFocus={handleFocus}
                    onBlur={() => setIsFocused(false)}
                    secureTextEntry={secureTextInput}
                />
                
                {showEyeIcon && (
                    <TouchableOpacity
                        onPress={toggleSecureText}
                        style={AuthInputStyles.eyeIcon}
                    >
                        <Ionicons 
                            name={secureTextInput ? "eye-off-outline" : "eye-outline"} 
                            size={22} 
                            color={error ? '#ff3b30' : (isFocused ? '#0066cc' : '#888')} 
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}