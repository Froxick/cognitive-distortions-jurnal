import { ActivityIndicator, StyleSheet, View } from "react-native"
import { useJurnalForm } from "../hooks/useJurnalForm."
import { RecordCreateForm } from "../ui/RecordCreateForm/RecordCreateForm"
import { useEffect, useState } from "react"
import { useJurnal } from "../hooks/useJurnalHook"
import { useDistortions } from "../../../hooks/useDestortion"
import { useDistortionContext } from "../../destortion/hooks/destortionContext"
import { EmotionPickItemType, JurnalRecord, JurnalRecordCardData, JurnalRecordEditProps } from "../types/JurnalTypes"
import { JurnalScreenProps, RecordCreateFormProps } from "../../../navigation/types/navigation"
import { useAuth } from "../../Auth/hooks/useAuthContext"
import { ParseRecordDataToCard } from "../../../utils/ParseRecordDataToCard/ParseRecordDataToCard"
import { emotions } from "../data/Emotion"
import { CommonActions } from "@react-navigation/native"

export interface modalVisibleStateType {
    distortionModal: false,
    emotionModal: false,
    emotionUpdateModal: boolean
}
export const RecordForm = ({navigation,route} : RecordCreateFormProps) => {
    const {record,backScreen} = route.params
    const {user} = useAuth()
    const {formState,formAction,errorsSrate} = useJurnalForm()
    const {errors,createRecord,createFormLoading,editRecord} = useJurnal()
    const {distortions,loading} = useDistortionContext()
    const[modalVisible,setModalVisible] = useState<modalVisibleStateType>({
        distortionModal: false,
        emotionModal: false,
        emotionUpdateModal: false

    })
    useEffect(() => {
         if(record != undefined) { 
                formAction.setPrevRecordState(record)
          }         
    },[])
    const[updateEmotion,setUpdateEmotion] = useState<EmotionPickItemType | null>(null)
    const openUpdateEmotionWindow = (data: EmotionPickItemType) => {
        setUpdateEmotion(data)
        switchVisible('emotionUpdateModal')
    }
    const closeUpdateEmotionWindow = () => {
        setUpdateEmotion(null)
        switchVisible('emotionUpdateModal')
    }
    const switchVisible = (field: keyof modalVisibleStateType) => {
        setModalVisible(prev => ({
            ...prev, [field]: !prev[field]
        }))
    }
    

    
    const onCreateRecord = async () => {
        const validateFormData = formAction.validateForm()
        if(!validateFormData) return
        try{
            await createRecord(validateFormData)
            formAction.clearData()
            formAction.clearErrors()
            navigation.reset({
            index: 0,
            routes: [
                { 
                    name: 'MainTabs',
                    params: { 
                        screen: 'DistortionJurnal'
                    }
                }
            ]
        });
        }catch(e){  
            console.error('Ошибка [onCreateRecord]',e)
        }
    }
    const onEditRecord = async () => {
        const validateFormData = formAction.validateForm()
        if(!validateFormData) return
        if(!user) return
        if(!record) return
        try{
            const data : JurnalRecordEditProps = {
                situation: formState.recordData.situation,
                contestation: formState.recordData.contestation,
                automaticThoughts: formState.recordData.automaticThoughts,
                destortionUid: formState.recordDestortionsUids,
                emotions: formState.recordEmotionList,
                userUid: user.uid
            }
            await editRecord(data, record.uid )
            formAction.clearData()
            formAction.clearErrors()
            const item : JurnalRecord = {
                ...data,
                date: record.date,
                uid: record.uid
            }
            const recordData : JurnalRecordCardData  = ParseRecordDataToCard({distortions,item,emotions})
            // navigation.replace('RecordDetail', {record: recordData})
            
            if(backScreen === 'JurnalHistory' ) {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1, 
                        routes: [
                            { 
                                name: 'MainTabs',
                            },
                            { 
                                name: 'JurnalHistory',
                                params: { 
                                    screen: 'JurnalHistory'
                                }
                            },
                            
                            { 
                                name: 'RecordDetail', 
                                params: { record: recordData } 
                            }
                        ]
                    })
                );
            } if(backScreen === 'MainTabs') {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 1, 
                        routes: [
                            { 
                                name: 'MainTabs',
                            },
                            { 
                                name: 'RecordDetail', 
                                params: { record: recordData } 
                            }
                        ]
                    })
                );
            }
           
        }catch(e){
            console.error('Ошиба [onEditRecord]',e )
        }
    }
         return(
        <View style={styles.container}>
            <RecordCreateForm data={formState.recordData} 
                              destorionSelectList={formState.recordDestortionsUids}
                              selectEmotion={formState.recordEmotionList}
                              onSubmit={record ? onEditRecord : onCreateRecord}
                              isEdit={record ? true : false}
                              setData={formAction.setData}
                              switchVisible={switchVisible}
                              visible={modalVisible}
                              errorsForm={errorsSrate.errors} 
                              destortions={distortions} 
                              errorServer={errors.createErrors}
                              toggleDestorion={formAction.toggleDestortion}
                              openUpdateModal={openUpdateEmotionWindow}
                              closeUpdateModal={closeUpdateEmotionWindow}
                              onAddEmotion={formAction.addEmotion}
                              onDeleteEmotion={formAction.deleteEmotion}
                              onUpdateEmotionIntensivity={formAction.updateEmotionIntensivity}
                              updateEmotion={updateEmotion ? updateEmotion : {
                                name: 'unknown',
                                emotionId: 'unknown',
                                intensivity: 0
                              }}
                              createFormLoading={createFormLoading}
            />
        </View>
    )
    
   
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})