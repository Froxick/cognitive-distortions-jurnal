import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { 
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from 'expo-secure-store';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};


let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const auth = getAuth(app);
const db = getFirestore(app);


export const saveDateLoginToSecureStore = async ( ) => {
  try{
    await SecureStore.setItemAsync('login_date',new Date().toISOString())
  }catch(e){
    console.log('Error',e)
  }
}
export const getDateLoginInSecureStoreAndCheck = async () => {
  try{
    const lastLoginDate = await SecureStore.getItemAsync('login_date') 
    if(!lastLoginDate) {return false}

    const lastDate = new Date(lastLoginDate)
    const thisDate = new Date()

    const diffMs = thisDate.getTime() - lastDate.getTime()

    const diffInDays = diffMs / (1000 * 60 * 60 * 24);

    if(diffInDays <= 7){ 
      return true
    } else{
      return false
    }
  }catch(e){
    console.log('Error',e)
  }
}
export const removeLastDateInSecureStore = async ( ) => {
  try{
      await AsyncStorage.removeItem('login_date')
  }catch(e){
    console.log('Error',e)
  }
}


export const saveUserToStorage = async (user: User | null ) => {
  try{
    if(user){
      await AsyncStorage.setItem('authUser', JSON.stringify({
        uid: user.uid,
        email: user.email,
        refreshToken: user.refreshToken
      }))
    }else{
      await AsyncStorage.removeItem('authUser')
    }
  }catch(e){  
    console.error('Ошбика при сохранение пользователя [config.ts]')
  }
}
export const getFullUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem('authUser');
    return user ? JSON.parse(user) : null;
  } catch (e) {
    console.error('Ошибка при получении пользователя', e);
    return null;
  }
};
export const removeUserInStorage = async() => {
  try{ 
    await AsyncStorage.removeItem('authUser')
  }catch(e) {
    console.log('Ошибка при попытке удалить user из AsyncStorage')
  }
}

export { 
  app, 
  auth, 
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  firebaseSignOut,
  onAuthStateChanged,
  User
};





