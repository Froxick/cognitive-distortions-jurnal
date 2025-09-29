export interface LoginData {
  email: string;
  password: string;
}
export type NavigateParams = 'login' | 'register'
export interface RegisterData extends LoginData {
  repeatPassword: string;
  name: string;
}

export type FormType = 'login' | 'register';
export type FieldType = keyof LoginData | keyof RegisterData;
export type FieldTypeT<T> = keyof T


export interface NavigateFunctionProps {
    navigateTo : (params: NavigateParams) => void
}

export interface AuthEmailFormProps <T extends Object, F extends FormType> extends NavigateFunctionProps {
    loading: boolean,
    formData: T,
    setData: (formType: F, field: FieldTypeT<T>,value: string) => void,
    onSubmit: (type: FormType) => void,
    errors: Record<FormType,Record<string,string>>,
    isError? : null | string,
    isErrorBool? : boolean,
    clearAuthError: () => void,
    clearError?: (formType: F, field: FieldTypeT<T>) => void

}