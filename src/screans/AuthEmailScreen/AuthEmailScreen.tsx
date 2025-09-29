import { ImageBackground, ScrollView, View } from "react-native"
import { AuthEmailScreenStyles } from "./AuthEmailScreenStyle"
import { AuthEmailLoginProps } from "../../navigation/types/navigation"
import { AuthEmailRegiserForm } from "../../features/Auth/components/regisrerForm/RegisterForm"
import { AuthEmailLoginForm } from "../../features/Auth/components/loginForm/LoginForm"
import { FormType, NavigateParams } from "../../features/Auth/types/AuthFeaturesType"
import { useAuthForm } from "../../features/Auth/hooks/useAuthForm"
import { useAuth } from "../../features/Auth/hooks/useAuthContext"
import { useEffect, useState } from "react"
import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export const AuthEmailSrceen: React.FC< AuthEmailLoginProps> = ({route, navigation}) => {
    const navigateTo = (params : NavigateParams) => {
        navigation.navigate('AuthEmailLogin', {type: params})
    }
    const {setData,loginData,registerData,errors,validateLoginData,validateRegisterData,clearData,clearError} = useAuthForm()
    const {loading,signIn,signUp} = useAuth()
    const {type} = route.params
    const[authError, setAuthError] = useState<null | string>(null)
    const onSubmit = async(type: FormType) => {
        if(type === 'login'){
            const validateForm = validateLoginData()
            if(validateForm.valid === true){
               try{
                 await signIn(validateForm.data.email, validateForm.data.password)
               }catch(e){
                setAuthError('Неверный логин или пароль')
                clearData('login')
               }
            }
        } else if(type === 'register'){
            const validateForm = validateRegisterData()
            if(validateForm.valid === true){
                try{
                    await signUp(validateForm.data.email,validateForm.data.password,validateForm.data.name)
                }catch(e){
                    setAuthError('Ошибка сервера')
                    clearData('register')
                }
            }
        }
    }
    const clearAuthError = () => {
        setAuthError(null)
    }
    return(
       <KeyboardAwareScrollView 
        contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
       >
            <View style={AuthEmailScreenStyles.container}>
            
                <View style={AuthEmailScreenStyles.circle1} />
            <View style={AuthEmailScreenStyles.circle2} />
            <View style={AuthEmailScreenStyles.circle3} />
            <View style={AuthEmailScreenStyles.circle4} />
            <View style={AuthEmailScreenStyles.triangle} />
            <View style={AuthEmailScreenStyles.square} />
            
           
            <View style={AuthEmailScreenStyles.content}>
                {
                    type === 'register' ? (
                        <AuthEmailRegiserForm loading={loading} clearAuthError={clearAuthError} isError={null} navigateTo={navigateTo} formData={registerData} setData={setData} errors={errors} onSubmit={onSubmit}/>
                    ) : (
                        <AuthEmailLoginForm loading={loading} clearAuthError={clearAuthError} isError={authError} navigateTo={navigateTo} formData={loginData} setData={setData} errors={errors} onSubmit={onSubmit}/>
                    )
                }
            </View>
           
            
        </View>
       </KeyboardAwareScrollView>
       
    )
}


