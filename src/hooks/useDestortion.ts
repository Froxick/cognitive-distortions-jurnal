import { useEffect, useState } from "react"
import { DistortionType } from "../navigation/types/navigation"
import { collection, getDoc, getDocs, orderBy, query } from "firebase/firestore"
import { db } from "../firebase/config"
import { useAuth } from "../features/Auth/hooks/useAuthContext"


export const useDistortions = () => {
    const[distortions,setDistortions] = useState<DistortionType[]>([])
    const[loading,setLoading] = useState(true)
    const[errors,setErrors] = useState<null | string>(null)
    const[refreshing,setRefreshing] = useState(false)
    


    const getDistortion = async () => {
        try{
            const distortionRef = collection(db,'distortions')
            const distortionQuery = query(
                distortionRef,
                orderBy('createdAt','desc')
            )

            const queryFetch = await getDocs(distortionQuery)
            const distortionData : DistortionType[] = []
            

            queryFetch.forEach((doc) => {
                const data = doc.data()
                distortionData.push({
                    id: doc.id,
                    name: data.name,
                    description: data.description,
                    example: data.example,
                    solution: data.solution,
                })
            })
            setDistortions(distortionData)
            setErrors(null)
        }catch(e){
            console.log('Ошиюка', e)
            setErrors('Не удалось загрузить данные, попробуйте позже')
        }finally{
            setLoading(false)
            setRefreshing(false)
        }
    }

    const refreshingFnc = async () => {
        setRefreshing(true)
        await getDistortion()
    }

    useEffect(() => {
        getDistortion()
    }, [])


    return{
        distortions,loading,errors,refreshing,refreshingFnc
    }
}