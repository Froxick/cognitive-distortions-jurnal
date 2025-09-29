import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithCustomToken, signInWithEmailAndPassword, User } from "firebase/auth";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { 
  auth, 
  db, 
  firebaseSignOut, 
  saveUserToStorage, 
  getFullUserFromStorage,
  removeUserInStorage,
  // exchangeRefreshTokenForIdToken,
  saveDateLoginToSecureStore,
  removeLastDateInSecureStore,
  getDateLoginInSecureStoreAndCheck
} from "../../../firebase/config";
import { doc, getDoc, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import * as SecureStore from 'expo-secure-store'; 
export interface UserProfile {
  uid: string,
  email: string,
  displayName: string | null;
  createdAt: any;
  lastLogin: any;
}
export interface IUserStats {
  recordCount: number,
  streakRecord: IstreakRecord
}
export interface IstreakRecord {
  count: number,
  lastRecordDate: Date | any | null,
  longCount: number
}

export interface IUserProfileAndStats {
  profile: UserProfile | null,
  stats: IUserStats | null,
}

interface AuthContextType {
  user: User | null,
  userProfile: UserProfile | null,
  userStats: IUserStats | null,
  loading: boolean,
  initialized: boolean, 
  signUp : (email: string,password: string,displayName: string) => Promise<void>,
  signIn: (email:string, password: string) => Promise<void>,
  signOut: () => Promise<void>,
  updateProfile: (displayName: string) => Promise<void>,
  setStatsUserFnc : (field: keyof IUserStats, action?: 'up' | 'down', value? : IstreakRecord) =>void
  // authInProgress: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  initialized: false,
  userStats: null,
  // authInProgress: false,
  signUp : async () => {},
  signIn: async() => {},
  signOut: async() => {},
  updateProfile: async () => {},
  setStatsUserFnc: () => {}
});

export const useAuth = () => useContext(AuthContext);



export const AuthProvider : React.FC<{children : ReactNode}> = ({children}) => {

  const[user,setUser] = useState<User | null>(null)
  const[userProfile,setUserProfile] = useState<UserProfile | null>(null)
  const[userStats,setUserStats] = useState<IUserStats | null>(null)

  const[loading,setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false); 



    useEffect(() => {
      const initAuth = async() => {
        try{
          const loginDate = await SecureStore.getItemAsync('login_date')
          
          if(!loginDate) {
            setUser(null)
            setUserProfile(null)
            await SecureStore.deleteItemAsync('refresh_token')
            return
          }
          const checkLoginTime = await getDateLoginInSecureStoreAndCheck()
          if(!checkLoginTime) {
            await signOut()
          } 

          // const token = await SecureStore.getItemAsync('refresh_token')
          // if(token && checkLoginTime) {
          //   await autoSignIn(token)
          // } else{
          //   setUser(null)
          //   setUserProfile(null)
          // }
          const savedUser = await getFullUserFromStorage()
          const savedPassword = await SecureStore.getItemAsync('user_password')
          if(savedUser && savedPassword) {
              const profile : UserProfile = {
                uid: savedUser.uid,
                email: savedUser.email,
                displayName: savedUser.displayName,
                createdAt: '',
                lastLogin: ''
              }
              // console.log('Иницилизация прошла -', profile)
              // console.log('Лог состояния user из initAuth', user)
              await autoSignIn(profile)
          } else{
            setUser(null)
            setUserProfile(null)
            await removeUserInStorage()
           
          }
        }catch(e){
          console.error('Ошибка при initAuth', e)
          
        }finally{
          setLoading(false)
          setInitialized(true)
        }
      }
      initAuth()
    },[])


    // const loadUserProfile = async (uid: string): Promise<UserProfile | null> => {
    //   const userDocRef = doc(db,'users',uid)
    //   const userDoc = await getDoc(userDocRef).catch(e => {
    //     console.error('Ошибка загрузки профиля', e)
    //     throw e
    //   })
    //   if(userDoc.exists()) {
    //     return userDoc.data() as UserProfile
    //   } else{
    //     return null
    //   }
    // }

    const setStatsUserFnc = (field: keyof IUserStats, action?: 'up' | 'down', value? : IstreakRecord) => {
      setUserStats(prev => {
          if (prev === null) {
          
          const initialState: IUserStats = {
            recordCount: 0,
            streakRecord: { count: 0, lastRecordDate: null, longCount: 0 },
          };
          
          
          if (field === 'recordCount') {
            initialState.recordCount = action === 'up' ? 1 : 0;
          }
          return initialState;
        }

      
        if (field === 'recordCount') {
          return {
            ...prev,
            recordCount: action === 'up' ? prev.recordCount + 1 : Math.max(0, prev.recordCount - 1)
          };
        }
      
        if(field ==='streakRecord' && value) {
          return {
            ...prev,
            streakRecord: value 

          }
        }
          return prev;
      });
    }

    const loadUserProfileAndStats = async (uid: string) : Promise<IUserProfileAndStats> => {
      const userDocRef = doc(db,'users',uid)
      const userDoc = await getDoc(userDocRef).catch(e => {
        console.error('Ошибка загрузки профиля',e)
        throw e
      }) 
      if(userDoc.exists()) {
         const profile : UserProfile = {
          uid: userDoc.data().uid,
          email: userDoc.data().email,
          displayName: userDoc.data().displayName,
          createdAt: userDoc.data().createdAt,
          lastLogin: userDoc.data().lastLogin
         }
         const stats : IUserStats = {
          recordCount: userDoc.data().recordCount,
          streakRecord: userDoc.data().streakRecord
         }
         return {
          profile: profile,
          stats: stats
         }
      } else{
        return {
          profile: null,
          stats: null
        }
      }
    }

    const signUp = async (email: string, password: string, displayName: string) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      const userDocRef = doc(db, 'users', newUser.uid);
      await setDoc(userDocRef, {
        uid: newUser.uid,
        email: newUser.email,
        displayName,
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
        recordCount: 0,
        streakRecord: {
          count: 0,
          lastRecordDate: null,
          longCount: 0
        }
         
      });
      

      setUser(newUser);
      setUserProfile({
        uid: newUser.uid,
        email: newUser.email as string,
        displayName,
        createdAt: new Date(),
        lastLogin: new Date()
      });
      setUserStats(
        {
          recordCount: 0,
          streakRecord: {
            count: 0,
            lastRecordDate: null,
            longCount: 0
          }
        }
      )

      await saveUserToStorage(newUser);
      await SecureStore.setItemAsync('user_password', password);
      // await SecureStore.setItemAsync('refresh_token',newUser.refreshToken)
      await saveDateLoginToSecureStore()
    } catch (e) {
      console.error('Ошибка регистрации:', e);
      throw e;
    } finally { 
      
      setLoading(false);
    }
  };

  const signOut = async () => {
    setLoading(true);
    try {
      await firebaseSignOut(auth);
      setUser(null);
      setUserProfile(null);
      setUserStats(null)
      await saveUserToStorage(null);
      await SecureStore.deleteItemAsync('user_password')
      // await SecureStore.deleteItemAsync('refresh_token')
      await removeLastDateInSecureStore()
      // statistic hook logic
    } catch (e) {
      console.error('Ошибка выхода:', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      
      setUser(firebaseUser);
      await SecureStore.setItemAsync('user_password', password);
      await saveUserToStorage(firebaseUser);
      // await SecureStore.setItemAsync('refresh_token',firebaseUser.refreshToken)
      await saveDateLoginToSecureStore()
      const {profile,stats} = await loadUserProfileAndStats(firebaseUser.uid);
      setUserProfile(profile);
      setUserStats(stats)
      
    } catch (e) {
      console.error('Ошибка входа:', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

    // const autoSignIn = async(token: string) => {
    //   if(!token) return

    //   setLoading(true)
    //   try{
    //     // const idtoken = await exchangeRefreshTokenForIdToken(token)
    //     // const result = await signInWithCustomToken(auth,idtoken)
    //     // const firebaseUser = result.user
    //     setUser(firebaseUser)
    //     const profile = await loadUserProfile(firebaseUser.uid)
    //     setUserProfile(profile)
    //     await SecureStore.setItemAsync('refresh_token',firebaseUser.refreshToken)
    //     await saveDateLoginToSecureStore()
    //   }catch(e){
    //     console.log('Ошибка aoutoSignIn', e)
    //   }finally{
    //     setLoading(false)
    //   }
    // }
  const autoSignIn = async(profilee: UserProfile) => {
     if(!profilee) {
      return
     }
     setLoading(true)
     try{
      const password = await SecureStore.getItemAsync('user_password')
      if(password) {
        const result = await signInWithEmailAndPassword(auth,
        profilee?.email,
        password)
        const firebaseUser = result.user
        setUser(firebaseUser)
        
        await SecureStore.setItemAsync('user_password', password);
        await saveUserToStorage(firebaseUser);
        const {profile,stats} = await loadUserProfileAndStats(firebaseUser.uid);
        setUserProfile(profile);
        setUserStats(stats)
      } else{
        return
      }
      
     }catch(e){
      console.log('Ошибка signInAuto', e)
     }finally{
      setLoading(false)
     }
  }
  
  const updateProfile = async (displayName: string) => {
    if (!user) {
      throw new Error('Пользователь не авторизован');
    }
    
    setLoading(true);
    try {
      const userDocRef = doc(db, 'users', user.uid);
      await updateDoc(userDocRef, { displayName });
      
      setUserProfile(prev => prev ? { ...prev, displayName } : null);
    } catch (e) {
      console.error('Ошибка обновления профиля:', e);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return(
    <AuthContext.Provider value={{setStatsUserFnc,userStats,user,userProfile,loading,initialized,signIn,signOut,signUp,updateProfile}}>
        {children}
    </AuthContext.Provider>

  )
}
