import { SafeAreaView, StyleSheet, Text, View } from "react-native"
import { AuthEmailFormProps, RegisterData } from "../../types/AuthFeaturesType"
import { AuthInput } from "../../ui/AuthInput/AuthInput"
import { ButtonWidget } from "../../../../components/ButtonWidget/ButtonWidget"
import { ColorTheme } from "../../../../style/Colors"
import { useState } from "react"


export const AuthEmailRegiserForm = ({setData,formData,errors,loading, navigateTo,onSubmit,clearError} : AuthEmailFormProps<RegisterData,'register'>) => {
    const setTextEmail = (query: string) => {
        setData('register','email',query)
    }
    const setTextName = (query: string) => {
        setData('register','name', query)
    }
    const setTextPassword = (query: string) => {
        setData('register','password',query)
    }
    const setTextRepeatPassword = (query: string) => {
        setData('register','repeatPassword',query)
    }

    const handleEmailFocus = () => clearError && clearError('register','email') 
    const handleNameFocus = () => clearError && clearError('register', 'name') 
    const handlePasswordFocus = () => clearError && clearError('register', 'password') 
    const handleRepeatPasswordFocus = () => clearError && clearError('register', 'repeatPassword') 


    const disbuttoncheck = loading || ( errors.register.email ? true : false) || 
                            ( errors.register.name ? true : false) ||
                            ( errors.register.password ? true : false) ||
                            ( errors.register.repeatPassword ? true : false)
    
    const handleSubmit = () => {
        let hasError = false;
        if(errors.register.email) {
            hasError = true
        } 
        if(errors.register.name) {
            hasError = true
        } 
        if(errors.register.password) {
            hasError = true
        }
        if(errors.register.repeatPassword){
            hasError = true
        }
        if(!hasError) {
            onSubmit('register')
        }
    }
    return(
         <SafeAreaView style={styles.container} >
                    <View style={styles.form_container}>
                        <View>
                            <Text style={styles.title}>
                                Регистрация
                            </Text>
                        </View>
                   <View style={styles.input_container}>
                   
                    <View style={styles.inputWrapper}>
                        <AuthInput 
                        value={formData.email} 
                        onChange={setTextEmail} 
                        placeHolder="Почта" 
                        icon='mail-outline'
                        error={!!errors.register.email}
                        onFocus={handleEmailFocus}
                        />
                        {errors.register.email && 
                        <Text style={styles.errorText}>{errors.register.email}</Text>
                        }
                    </View>
                 
                    <View style={styles.inputWrapper}>
                        <AuthInput 
                        value={formData.name} 
                        onChange={setTextName} 
                        placeHolder="Имя" 
                        icon='man-outline'
                        error={!!errors.register.name}
                        onFocus={handleNameFocus}
                        />
                        {errors.register.name && 
                        <Text style={styles.errorText}>{errors.register.name}</Text>
                        }
                    </View>
                    
                    
                    <View style={styles.inputWrapper}>
                        <AuthInput 
                        value={formData.password} 
                        onChange={setTextPassword} 
                        placeHolder="Пароль" 
                        icon='lock-closed-outline' 
                        secureTextEntry
                        error={!!errors.register.password}
                        onFocus={handlePasswordFocus}
                        />
                        {errors.register.password && 
                        <Text style={styles.errorText}>{errors.register.password}</Text>
                        }
                    </View>
                    
                   
                    <View style={styles.inputWrapper}>
                        <AuthInput 
                        value={formData.repeatPassword} 
                        onChange={setTextRepeatPassword} 
                        placeHolder="Повторить пароль" 
                        icon="lock-closed-outline"
                        error={!!errors.register.repeatPassword}
                        onFocus={handleRepeatPasswordFocus}
                        />
                        {errors.register.repeatPassword && 
                        <Text style={styles.errorText}>{errors.register.repeatPassword}</Text>
                        }
                    </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <ButtonWidget loading={loading} disabled={disbuttoncheck} onPress={handleSubmit}  title="Создать" backColor={ColorTheme.main_color} color="white" wight={200} height={50}/>
                    </View>
                    <View style={styles.footerTextContainer}>
                        <Text style={styles.footerText}>
                            Есть аккаунт? <Text style={styles.footerTextLink} onPress={() => navigateTo('login')}>
                                 Войти
                            </Text>
                        </Text>
                    </View>
                    </View>
                    
                    
        </SafeAreaView> 
    )
}


const styles = StyleSheet.create({
    inputWrapper: {
    marginBottom: 10,
    },
     errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
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
        marginTop: 30
    },
    input_container: {
        justifyContent: 'center',
        gap: 5,
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