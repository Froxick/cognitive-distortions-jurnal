import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from "react"
import { JurnalHookErrors, JurnalRecord, JurnalRecordCreateProps, JurnalRecordEditProps } from '../types/JurnalTypes';
import { addDoc, collection, deleteDoc, doc, DocumentSnapshot, getDocs, limit, orderBy, query, QueryConstraint, serverTimestamp, startAfter, updateDoc, where } from "firebase/firestore"
import { db } from "../../../firebase/config"
import { useAuth } from "../../Auth/hooks/useAuthContext"
import { useStatsHook } from "../../stats/hooks/useStatsHook";



interface JurnalContextType {
    jurnal: JurnalRecord[] | null,
    lastRecords: JurnalRecord[] | null,
    loading: boolean,
    errors: JurnalHookErrors,
    getRecords: (filters?: IJuralHookGetFilters) => Promise<void>,
    getLastRecords: () => Promise<void>,
    createRecord: (data: JurnalRecordCreateProps) => Promise<void>
    editRecord: (data: JurnalRecordEditProps, uid: string) => Promise<void>
    deleteRecord: (uid: string) => Promise<void>,
    clearErrorsServer: () => void,
    loadMoreRecords : () => Promise<void>,
    loadingMoreRecords : boolean,
    hasMoreRecords: boolean,
    applyFilters: (filters: IJuralHookGetFilters) => void,
    createFormLoading: boolean,
    deleteFormLoading: boolean
    
}

interface IJurnalHookPaginationState {
    pageSize: number,
    loadingMoreRecords: boolean,
    hasMoreRecords: boolean,
    lastVisible: DocumentSnapshot | null,
    currentFilters: IJuralHookGetFilters | null
}
export interface IJuralHookGetFilters {
    dateFrom?: Date,
    dateTo?: Date,
    distortionUid? : string 
}
const JurnalContext = createContext<JurnalContextType>({
    jurnal: null,
    lastRecords: null,
    loading: false,
    errors: {
        createErrors: '',
        getErrors: '',
        deleteErrors: '',
        editErrors: ''
    },
    loadingMoreRecords: false,
    hasMoreRecords: false,
    loadMoreRecords: async() => {},
    getRecords : async() => {},
    getLastRecords: async() => {},
    createRecord: async() => {},
    editRecord: async() => {},
    deleteRecord: async() => {},
    clearErrorsServer: () => {},
    applyFilters: () => {},
    createFormLoading: false,
    deleteFormLoading: false
})


export const useJurnal = () => useContext(JurnalContext)

export const JurnalProvider : React.FC<{children: ReactNode}> =({children}) => {
    
    const {user} = useAuth()
    const {updateTodayRecordCount,setRecordCount,checkStreak} = useStatsHook()
    const [jurnal,setJurnal] = useState<JurnalRecord[] | null>(null)
    const [lastRecords,setLastRecords] = useState<JurnalRecord [] | null>(null)
    const [loadingg,setLoading] = useState<boolean>(false)
    const [errors,setErrors] = useState<JurnalHookErrors >({
        createErrors: '',
        getErrors: '',
        deleteErrors: '',
        editErrors: ''
    })

    const[createFormLoading,setCreateFormLoading] = useState<boolean>(false)
    const[deleteFormLoading, setDeleteFormLoading] = useState<boolean>(false)


    const [paginationState,setPaginationState] = useState<IJurnalHookPaginationState>({
        lastVisible: null,
        hasMoreRecords: false,
        loadingMoreRecords: false,
        pageSize: 5,
        currentFilters: null
        
    })
    const getLastRecords = useCallback(async () : Promise<void> => {
        if(!user) return
        setLoading(true)
        setLastRecords(null)
        try{
            const recordRef = collection(db,'entries')
            const recordQuery = query(
                recordRef,
                where("userUid", "==", user.uid),
                orderBy("date", "desc"),
                limit(3) 
            );
            
            const fetch = await getDocs(recordQuery);
            const recordsData: JurnalRecord[] = fetch.docs.map(doc => {
                const data = doc.data();
                return {
                    uid: doc.id,
                    userUid: data.userUid,
                    situation: data.situation,
                    contestation: data.contestation,
                    destortionUid: data.destortionUid,
                    automaticThoughts: data.automaticThoughts,
                    emotions: data.emotions,
                    date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
                }
            });
            
            setLastRecords(recordsData);


        }catch(e){
            console.error('Ошибка загрузки последних записей', e);
            setErrors(prev => ({
                ...prev,
                getErrors: 'Не удалось загрузить последние записи'
            }));
        }
        finally{
            setLoading(false)
        }

    },[user])

    const getRecords = async (filters?: IJuralHookGetFilters) => {
        setLoading(true)
        setJurnal(null)
        setPaginationState(prev => ({
            ...prev,
            lastVisible: null,
            hasMoreRecords: true,
            currentFilters: filters || null
        }))

        try{
            const constraints: QueryConstraint[] = [
                where("userUid", "==", user?.uid),
                orderBy("date", "desc"),
                limit(paginationState.pageSize)
            ]

            if(filters) {
                if(filters.dateFrom) {
                    constraints.push(where("date", ">=", filters.dateFrom))
                }
                if(filters.dateTo) {
                    constraints.push(where("date","<=",filters.dateTo))
                }
                if(filters.distortionUid) {
                    constraints.push(where("destortionUid", "array-contains", filters.distortionUid))
                }
            }
            const recordQuery = query(collection(db,'entries'), ...constraints)
            const fetch = await getDocs(recordQuery)
            const lastDoc = fetch.docs.length > 0 ? fetch.docs[fetch.docs.length - 1] : null

            setPaginationState(
                prev => ({
                    ...prev,
                    lastVisible: lastDoc,
                    hasMoreRecords: fetch.docs.length === paginationState.pageSize
                })
            )

             const recordsData: JurnalRecord[] = fetch.docs.map(doc => {
                const data = doc.data()
                return {
                    uid: doc.id,
                    userUid: data.userUid,
                    situation: data.situation,
                    contestation: data.contestation,
                    destortionUid: data.destortionUid,
                    automaticThoughts: data.automaticThoughts,
                    emotions: data.emotions,
                    date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
                }
            })

            setJurnal(recordsData)
            
           
            
        }catch(e){
            setErrors(prev => ({
                ...prev,
                getErrors: 'Не удалось загрузить записи, попробуйте позже'
            }))
            console.log('Ошибка', e)
        }finally{
            setLoading(false)
        }
    }
    const applyFilters = (filters: IJuralHookGetFilters) => {
        getRecords(filters)
    }

    useEffect(() => {
        if(user) {
            getRecords()
           
        }
    },[user])
    useEffect(() => {
        getLastRecords()
    }, [user,getLastRecords])

    const hasError = () => {
       return Object.values(errors).some(error => error.length > 0)
    }
    useEffect(() => {
        console.log('effect clear errors use!!!')
        if(hasError()) {
            setTimeout(() => clearErrorsServer(), 5000)
        }
    }, [errors])

    const loadMoreRecords = async() => {
        if(!paginationState.hasMoreRecords || paginationState.loadingMoreRecords) return

        setPaginationState(
            prev => ({
                ...prev,
                loadingMoreRecords: true
            })
        )
        try{
            const constraints: QueryConstraint[] = [
                where("userUid", "==", user?.uid),
                orderBy("date", "desc"),
                startAfter(paginationState.lastVisible),
                limit(paginationState.pageSize)
            ]
            if (paginationState.currentFilters) {
                const filters = paginationState.currentFilters
                if (filters.dateFrom) constraints.push(where("date", ">=", filters.dateFrom))
                if (filters.dateTo) constraints.push(where("date", "<=", filters.dateTo))
                if (filters.distortionUid) constraints.push(where("destortionUid", "array-contains", filters.distortionUid))
            }
            const recordQuery = query(collection(db, 'entries'), ...constraints)
            const snapshot = await getDocs(recordQuery)
            const lastDoc = snapshot.docs.length > 0 ? snapshot.docs[snapshot.docs.length - 1] : null

            setPaginationState(
                prev => ({
                    ...prev,
                    lastVisible: lastDoc,
                    hasMoreRecords: snapshot.docs.length === paginationState.pageSize,
                    loadingMoreRecords: false
                })
            )
            const newRecords: JurnalRecord[] = snapshot.docs.map(doc => {
                const data = doc.data()
                return {
                    uid: doc.id,
                    userUid: data.userUid,
                    situation: data.situation,
                    contestation: data.contestation,
                    destortionUid: data.destortionUid,
                    automaticThoughts: data.automaticThoughts,
                    emotions: data.emotions,
                    date: data.date?.toDate ? data.date.toDate() : new Date(data.date),
                }
            })

            setJurnal(prev => [...(prev || []), ...newRecords])
        }catch(e){
            setPaginationState(
                prev => ({
                    ...prev,
                    loadingMoreRecords: false
                })
            )
            setErrors(prev => ({
                ...prev,
                getErrors: 'Не удалось загрузить дополнительные записи'
            }));
            console.error('Ошибка [useJurnalHook]',e)
        }finally{
            setPaginationState(
                prev => ({
                    ...prev,
                    loadingMoreRecords: false
                })
            )
        }
    }

    const createRecord = async(data: JurnalRecordCreateProps) => {
        setCreateFormLoading(true)
        try{
            if(!user) return
            const recordRef = collection(db,'entries')
            const newRecord = {
                ...data,
                userUid: user.uid,
                date: new Date()
            }
            const docRef = await addDoc(recordRef,newRecord)
            
            await getRecords()  
            await updateTodayRecordCount() 
            await checkStreak(true)
            setLastRecords(prev => {
                const newRecordWithId: JurnalRecord = {
                    ...newRecord,
                    uid: docRef.id
                };
                
                
                if (!prev || prev.length < 3) {
                    return prev ? [newRecordWithId, ...prev] : [newRecordWithId];
                }
                
                
                return [newRecordWithId, ...prev.slice(0, 2)];
            });
        }catch(e){
            setErrors(prev => ({
                ...prev,
                createErrors: 'Ошибка при создании записи'
            }))
            console.error('Ошбика [createRecord]', e)
        }
        finally{
            setCreateFormLoading(false)
        }
    }
    const deleteRecord = async(uid: string) => {
        setDeleteFormLoading(true)
        try{
            const recordRef = doc(db,'entries',uid)
            await deleteDoc(recordRef)
            const findDeleteRecordInLastRecords = lastRecords?.find(el => el.uid === uid)
            if(findDeleteRecordInLastRecords != undefined) {
                await getLastRecords()
            }
            await updateTodayRecordCount()
            setJurnal(
                prev => {
                    const  baseArray = Array.isArray(prev) ? prev : []
                    return (
                        baseArray.filter(record => record.uid !== uid)
                    )
                }
            )
           
            setPaginationState(prev => ({
                ...prev,
                hasMoreRecords: prev.hasMoreRecords
            }))
            await setRecordCount('down')
        }catch(e){
            setErrors(prev => ({
                ...prev,
                deleteErrors: 'Ошибка при удалении записи'
            }))
            console.error('Ошбика [deleteRecord]', e)
        }finally{
            setDeleteFormLoading(false)
        }
    }
    const editRecord = async ( data: JurnalRecordEditProps, uid: string) => {
        setCreateFormLoading(true)
        try {
            const recordRef = doc(db,'entries', uid)
            await updateDoc(recordRef,{
                ...data
            })

            setJurnal(prev => {
                const baseArray = Array.isArray(prev) ? prev : []
                return(
                    baseArray.map(record =>
                        record.uid === uid ? {...record,...data} : record
                    )
                )
            })
            const find = lastRecords?.find(el => el.uid === uid)
            if(find) {
                setLastRecords(
                    prev => {
                        const baseArray = Array.isArray(prev) ? prev : []
                        return(
                            baseArray.map(
                                record => record.uid === uid ? {...record,...data} : record
                            )
                        )
                    }
                )
            }
        }catch(e){
            setErrors(prev => ({
                ...prev,
                editErrors: 'Ошибка при редактировании записи'
            }))
            console.error('Ошбика [editRecord]', e)
        }finally{
            setCreateFormLoading(false)
        }
    }
    const clearErrorsServer =() => {
        setErrors({
            getErrors: '',
            createErrors: '',
            deleteErrors: '',
            editErrors: ''
        })
    }
    return(
        <JurnalContext.Provider value={{createFormLoading,loadingMoreRecords: paginationState.loadingMoreRecords,
         hasMoreRecords: paginationState.hasMoreRecords,
         applyFilters, loadMoreRecords ,loading: loadingg,clearErrorsServer,
         errors,jurnal,getRecords,createRecord,deleteRecord,editRecord,
         getLastRecords,lastRecords,deleteFormLoading
         
         }}>
            {children}
        </JurnalContext.Provider>
    )
} 

