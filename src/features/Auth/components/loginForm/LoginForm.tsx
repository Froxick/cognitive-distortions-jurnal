import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { AuthEmailLoginProps } from "../../../../navigation/types/navigation"


import { AuthEmailFormProps, LoginData } from "../../types/AuthFeaturesType"
import { AuthInput } from "../../ui/AuthInput/AuthInput"
import { ColorTheme } from "../../../../style/Colors"
import { ButtonWidget } from "../../../../components/ButtonWidget/ButtonWidget"
import { useEffect, useState } from "react"



export const AuthEmailLoginForm = ({
    formData,
    navigateTo,
    errors,
    setData,
    onSubmit,
    isError,
    clearAuthError,
    loading
}: AuthEmailFormProps<LoginData, 'login'>) => {
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    
    const setTextEmail = (query: string) => {
        setData('login','email',query);
        if (emailError) setEmailError(false);
    }
    
    const setTextPassword = (query: string) => {
        setData('login','password',query);
        if (passwordError) setPasswordError(false);
    }
    
    const handleInputFocus = (field: 'email' | 'password') => {
        clearAuthError()
        if (field === 'email' && emailError) setEmailError(false);
        if (field === 'password' && passwordError) setPasswordError(false);
    }
    
    const handleSubmit = () => {
        let hasError = false;
        
        if (formData.email.length === 0) {
            setEmailError(true);
            hasError = true;
        }
        
        if (formData.password.length === 0) {
            setPasswordError(true);
            hasError = true;
        }
        
        if (!hasError) {
            onSubmit('login');
        }
    }
    
    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.form_container}>
                <View>
                    <Text style={styles.title}>
                        Авторизация
                    </Text>
                    <Text style={{textAlign: 'center', color: 'red', fontSize: 15}}>
                        {isError ? 'Неверный логин или пароль' : null}
                    </Text>
                </View>
                <View style={styles.input_container}>
                    <AuthInput 
                        value={formData.email} 
                        onChange={setTextEmail} 
                        placeHolder="Почта" 
                        icon='mail-outline'
                        error={emailError || isError ? true : false}
                        onFocus={() => handleInputFocus('email')}
                    />
                    {emailError && (
                        <Text style={styles.errorText}>Поле обязательно для заполнения</Text>
                    )}
                    
                    <AuthInput 
                        value={formData.password} 
                        onChange={setTextPassword} 
                        placeHolder="Пароль" 
                        icon='lock-closed-outline' 
                        secureTextEntry
                        error={passwordError || isError ? true: false}
                        onFocus={() => handleInputFocus('password')}
                    />
                    {passwordError && (
                        <Text style={styles.errorText}>Поле обязательно для заполнения</Text>
                    )}
                </View>
                <View style={styles.buttonContainer}>
                    <ButtonWidget 
                        loading={loading}
                        title="Войти" 
                        backColor={ColorTheme.main_color} 
                        color="white" 
                        wight={200} 
                        height={50}
                        onPress={handleSubmit}
                        disabled={emailError || passwordError || loading || (isError ? true : false) }
                    />
                </View>
                <View style={styles.footerTextContainer}>
                    <Text style={styles.footerText}>
                        Нет аккаунта? 
                        <Text 
                            style={styles.footerTextLink} 
                            onPress={() => navigateTo('register')}
                        >
                            Создать
                        </Text>
                    </Text>
                </View>
            </View>
        </SafeAreaView> 
    )
}


const styles = StyleSheet.create({
    errorText: {
        color: '#ff3b30',
        fontSize: 12,
        marginTop: 0,
        marginLeft: 10,
    },
    container : {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        marginVertical: 220
    },
    form_container: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        backgroundColor: 'white',
        width: 320,
        height: 'auto',
         justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        borderRadius: 15
    },
    title: {
        color: ColorTheme.main_color,
        fontSize: 35,
        fontWeight: 'bold',
        marginTop: 40
    },
    input_container: {
        justifyContent: 'center',
        gap: 15,
        marginTop:30,
        marginBottom: 30
    },
    buttonContainer: {
        marginBottom: 10
    },
    footerTextContainer: {
        marginBottom: 40
    },
    footerText: {
        color: 'grey'
    },
    footerTextLink: {
        color: ColorTheme.main_color,
        fontWeight: 'bold'
    }
})