import { useState, useCallback } from "react";
import { FieldType, FormType, LoginData, RegisterData } from "../types/AuthFeaturesType";


export const useAuthForm = () => {
  const [loginData, setLoginData] = useState<LoginData>({
    email: '',
    password: ''
  });

  const [registerData, setRegisterData] = useState<RegisterData>({
    email: '',
    password: '',
    repeatPassword: '',
    name: ''
  });

  const [errors, setErrors] = useState<Record<FormType, Record<string, string>>>({
    login: {},
    register: {}
  });
  
  


  const setData = useCallback((formType: FormType, field: FieldType, value: string) => {
    if (formType === 'login') {
      setLoginData(prev => ({ ...prev, [field]: value }));
      setErrors(prev => ({
        ...prev,
        login: { ...prev.login, [field]: '' }
      }));
    } else {
      setRegisterData(prev => ({ ...prev, [field]: value }));
      setErrors(prev => ({
        ...prev,
        register: { ...prev.register, [field]: '' }
      }));
    }
  }, []);


  const clearData = useCallback((formType: FormType) => {
    if (formType === 'register') {
      setRegisterData({
        email: '',
        password: '',
        repeatPassword: '',
        name: ''
      });
    } else {
      setLoginData({
        email: '',
        password: '',
      });
    }
    
    setErrors(prev => ({
      ...prev,
      [formType]: {}
    }));
  }, []);

  const clearError = useCallback((formType: FormType, field: FieldType) => {
    setErrors(prev => ({
      ...prev,
      [formType]: { ...prev[formType], [field]: '' }
    }));
  }, []);

  
  const validateEmail = useCallback((value: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(value);
  }, []);

  
  const validatePassword = useCallback((value: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,20}$/;
    return passwordRegex.test(value);
  }, []);

  
  const validateLoginData = useCallback((): { valid: boolean; data: LoginData } => {
    const newErrors: Record<string, string> = {};
    let valid = true;

    if (!loginData.email) {
      newErrors.email = 'Email обязателен';
      valid = false;
    }
 

    if (!loginData.password) {
      newErrors.password = 'Пароль обязателен';
      valid = false;
    }

    setErrors(prev => ({
      ...prev,
      login: newErrors
    }));
   
    return { valid, data: loginData };
  }, [loginData, validateEmail, validatePassword]);

  
  const validateRegisterData = useCallback((): { valid: boolean; data: RegisterData } => {
    const newErrors: Record<string, string> = {};
    let valid = true;

    if (!registerData.email) {
      newErrors.email = 'Email обязателен';
      valid = false;
    } else if (!validateEmail(registerData.email)) {
      newErrors.email = 'Неверный формат email';
      valid = false;
    }

    if (!registerData.password) {
      newErrors.password = 'Пароль обязателен';
      valid = false;
    } else if (!validatePassword(registerData.password)) {
      newErrors.password = 'Пароль должен содержать 8-20 символов, заглавную букву и цифру';
      valid = false;
    }

    if (!registerData.repeatPassword) {
      newErrors.repeatPassword = 'Повторите пароль';
      valid = false;
    } else if (registerData.password !== registerData.repeatPassword) {
      newErrors.repeatPassword = 'Пароли не совпадают';
      valid = false;
    }

    if (!registerData.name) {
      newErrors.name = 'Имя обязательно';
      valid = false;
    } else if (registerData.name.length < 3 || registerData.name.length > 20) {
      newErrors.name = 'Имя должно быть от 3 до 20 символов';
      valid = false;
    }

    setErrors(prev => ({
      ...prev,
      register: newErrors
    }));
    return { valid, data: registerData };
  }, [registerData, validateEmail, validatePassword]);

  return {
    loginData,
    registerData,
    setData,
    errors,
    validateLoginData,
    validateRegisterData,
    clearData,
    clearError,
  };
};