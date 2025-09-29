import { useEffect, useState } from "react"
import { IstreakRecord, useAuth } from "../../Auth/hooks/useAuthContext"
import { doc, increment, updateDoc } from "firebase/firestore"
import { db } from "../../../firebase/config"
import { convertFirestoreDate, getDayDifference } from "../../../utils/DateHelpers/DateHelper"
import { getTodaysRecordCount } from "../api/getTodayRecordCount"


export const useStatsHook = () => {
    const {user,userStats,setStatsUserFnc} = useAuth()
    const [loading,setLoading] = useState<boolean>(false)
       
    const[todayRecordCount,setTodayRecordCount] = useState<number>(0)

    const updateTodayRecordCount = async ( ) => {
        if(!user) return
        setLoading(true)
        try{
            const count = await getTodaysRecordCount(user.uid)
            setTodayRecordCount(count)
        }catch(e){
            console.error('Ошибка при обновлении количества записей за сегодня')
        }finally{
            setLoading(false)
        }
    }
    
    useEffect(() => {
        updateTodayRecordCount()
    }, [user])

    const setNewStreakFnc = async(newStreak: IstreakRecord) => {
        if(!user) return
         setLoading(true)
            try{   
                const userRefDoc = doc(db,'users',user.uid)
                await updateDoc(userRefDoc,{
                    streakRecord: newStreak
                })
                setStatsUserFnc('streakRecord',undefined,newStreak)
            }catch(e){
                console.error('Ошибка [useStatsHook] ',e)
            }finally{
                setLoading(false)
            }
    }

    const checkStreak = async(createNew: boolean) => {
        if(!userStats) return
        if(!user) return
        
        const oldStreak = userStats.streakRecord
        const lastDate = convertFirestoreDate(oldStreak.lastRecordDate)
        const newDate = new Date()

        if(createNew) {
            if(lastDate === null) {
                const newStreak : IstreakRecord = {
                    count: 1,
                    longCount: 1,
                    lastRecordDate: new Date()
                    
                }
                setLoading(true)
                try{
                    await setRecordCount('up')
                    const userRefDoc = doc(db,'users',user.uid)
                    await updateDoc(userRefDoc, {
                        streakRecord: newStreak
                    })
                    setStatsUserFnc('streakRecord',undefined,newStreak)
                }catch(e){
                    console.error('Ошибка [useStatsHook]',e)
                }finally{
                    setLoading(false)
                }
            } else{
                const differens = getDayDifference(lastDate,newDate)
                if(differens === 1) {
                     const newStreak : IstreakRecord = {
                            count: oldStreak.count + 1,
                            lastRecordDate: newDate,
                            longCount: Math.max(oldStreak.longCount, oldStreak.count + 1)
                    }
                    await setNewStreakFnc(newStreak)
                    await setRecordCount('up')    
                } else if (differens === 0) {
                    await setRecordCount('up')
                } else if(differens > 1) {
                         const newStreak: IstreakRecord = {
                            count : 1,
                            lastRecordDate: newDate,
                            longCount: Math.max(oldStreak.longCount, oldStreak.count)
                        }
                        await setNewStreakFnc(newStreak)
                        await setRecordCount('up') 
                }else{
                    console.error('Дата последней записи в будущем!')
                }
                
            }
        } else{
            if(lastDate === null) {
                return
            } else{
                const differens = getDayDifference(lastDate,newDate)
                if(differens > 1) {
                    const newStreak: IstreakRecord = {
                            count : 0,
                            lastRecordDate: oldStreak.lastRecordDate,
                            longCount: oldStreak.longCount < oldStreak.count ? oldStreak.count : oldStreak.longCount
                    }
                    await setNewStreakFnc(newStreak)
                }
            }
        }

    }

    const setRecordCount = async(action: 'up' | 'down') => {
        if(!user) return
        setLoading(true)
        try{
            const value = action === 'up' ? 1 : -1 
            const userDocRef = doc(db,'users',user.uid)
            await updateDoc(userDocRef,{
                recordCount: increment(value)
            })
            setStatsUserFnc('recordCount',action)
        }catch(e){ 
            console.error('Ошибка [useStatsHook]',e)
        }finally{
            setLoading(false)
        }
    }

    return {
        userStats,setRecordCount,checkStreak,statsLoading: loading, todayRecordCount,updateTodayRecordCount
    }
}