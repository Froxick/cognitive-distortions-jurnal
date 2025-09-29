import { useCallback, useState } from "react"
import {  EmotionJurnal, JurnalFieldType, JurnalRecordCardData, JurnalRecordCreateProps, JurnalRecordFormData, JurnalRecordFormErros } from '../types/JurnalTypes';

export const useJurnalForm = () => { 
    const[recordData,setRecordData] = useState<JurnalRecordFormData>({
        situation: '',
        contestation: '',
        automaticThoughts: ''
         
    })
    const[recordDestortionsUids, setRecordDestortionsUids] = useState<string[]>([])
    const[recordEmotionList,setRecordEmotionList] = useState<EmotionJurnal[]>([])

    
    const setPrevRecordState = (record : JurnalRecordCardData) => {
         setRecordData(
            prev => ({
                ...prev,
                situation: record.situation || '',
                contestation: record.contestation || '',
                automaticThoughts: record.automaticThoughts || ''
            })
         )
         const distortionUids = record.distortions.map(
            el => {
                return el.id
            }
         )

         setRecordDestortionsUids(
            distortionUids || []
         )

        const emotionList = record.emotions.map(
            el => {
                return {
                    emotionId: el.id,
                    intensivity: el.intensivity
                }
            }
        )
         setRecordEmotionList(
            emotionList || []
         )
    }
    const[errors,setErrors] = useState<JurnalRecordFormErros>({
        situation: null,
        contestation: null,
        automaticThoughts: null
    })
    const addEmotion = (id: string) => {      
       if(recordEmotionList.find(item => item.emotionId === id)) { return }
        setRecordEmotionList(
            prev => [
                ...prev,
                {emotionId: id, intensivity: 5}
            ]
        )
    }

    const deleteEmotion = (index: number) => {
        setRecordEmotionList(prev => prev.filter((_,i) => i !== index))
    }

    const updateEmotionIntensivity = (index: number, intensivity: number) => {
        setRecordEmotionList(
            prev => prev.map((emotion, i) => 
                i === index ? {...emotion, intensivity} : emotion    
            )
        )
    }

    const updateEmotion = (index: number, id: string) => {
        setRecordEmotionList(prev => 
            prev.map((emotion, i) => 
                i === index ? { ...emotion, id } : emotion
            )
        );
    };

    const toggleDestortion = (uid: string) => {
        setRecordDestortionsUids(prev => prev.includes(uid) ? prev.filter(id => id !== uid) : [...prev, uid])
    }

   
    const setData = useCallback((field: JurnalFieldType,value: string) => {
        setRecordData(prev => ({...prev, [field]: value}));
        setErrors(prev => ({
            ...prev,
            [field] : ''
        }))
    },[])

    const clearData = useCallback(() => {
        setRecordData({
            situation: '',
            contestation: '',
            automaticThoughts: ''
        })
        setRecordDestortionsUids([])
    }, [])

    const clearErrors = () => {
        setErrors({
            contestation: null,
            situation: null,
            automaticThoughts: null
        })
    }

    const validate = () => { 
        return [
            recordData.contestation.trim().length > 0,
            recordData.situation.trim().length > 0,
            recordData.automaticThoughts.trim().length > 0
        ]
        
    }

    const validateForm = () : null | JurnalRecordCreateProps => {
        const check = validate()
        if(check[0] != true) { setErrors(prev =>  ({...prev,contestation : 'Поле не может быть пустым'})) }
        if(check[1] != true) { setErrors(prev => ({...prev, situation: 'Поле не может быть пустым'})) }
        if(check[2] != true ) {setErrors(prev => ({...prev, automaticThoughts: 'Поле не может быть пустым'}))}
        if(check[0] === true && check[1] === true && check[2] === true) {
            const record : JurnalRecordCreateProps = {
                situation: recordData.situation,
                contestation: recordData.contestation,
                destortionUid: recordDestortionsUids,
                automaticThoughts: recordData.automaticThoughts,
                emotions: recordEmotionList
            }
            return record
        } else {
            return null
        }
    }

    return {
        formState: {recordData,recordDestortionsUids,recordEmotionList,},
        errorsSrate: {errors},
        formAction: {setData,toggleDestortion,clearData,
            clearErrors,validateForm,
            addEmotion, deleteEmotion,
            updateEmotion, updateEmotionIntensivity,
            setPrevRecordState
        
        }
    }
}