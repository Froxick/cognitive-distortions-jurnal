import { Pressable, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { JurnalRecordCardData } from "../../types/JurnalTypes"
import { DistortionType, RecordDetailProps } from "../../../../navigation/types/navigation"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from '@expo/vector-icons';
import { ColorTheme } from "../../../../style/Colors";
import { formatDate } from "../../../../utils/DateHelpers/DateHelper";
import { JurnalRecordViewScreenStyles } from "./JurnalRecordViewScreen.style";
import { useJurnal } from "../../hooks/useJurnalHook";
import { useState } from "react";
import { DestortionModalWindow } from "../../ui/DestortionModalWindow/DestortionModalWindow";
import { DeleteConfirm } from "../../ui/DeleteConfirm/DeleteConfirm";
import { useDistortionContext } from "../../../destortion/hooks/destortionContext";
import { DistortionParse } from "../../../../utils/DistortionParse/DistortionParse";
import { DistortionDescriptionView } from "../../ui/DistortionDescriptionView/DistortionDescriptionView";
interface IVisibleState {
    deleteModalVisible: boolean,
    distortionVisible: boolean
}
export const JurnalRecordsViewScreen = ({route, navigation} : RecordDetailProps) => {
    const {record,backScreen} = route.params
    const {distortions,loading} = useDistortionContext()
    const [distortionView,setDistortionVivew] = useState<DistortionType | null>(null)
    const styles = JurnalRecordViewScreenStyles
    const {deleteRecord, deleteFormLoading} = useJurnal()
    
    const[visibleState,setVisibleState] = useState<IVisibleState>({
        deleteModalVisible: false,
        distortionVisible: false
    })
    const toEditForm = () => {
        navigation.navigate('JurnalFormCreate', {record,backScreen})
    }
    const onDeleteRecord = ( ) => {
        deleteRecord(record.uid)
        setVisibleState(
            prev => ({
                ...prev,
                deleteModalVisible: false
            })
        )
        navigation.goBack()
    } 
    const switchVisibleStates = (field : keyof IVisibleState) => {
        setVisibleState(
            prev => ({
                ...prev,
                [field] : !prev[field]
            })
        )
    } 

    const openDistortionViewModal = (uid: string) => {
        const distortion = DistortionParse(uid, distortions)
        if(!distortion) return
        setDistortionVivew(distortion)
        switchVisibleStates('distortionVisible') 
    }
    const closeDistortionViewModal = () => {
        setDistortionVivew(null)
        setVisibleState(
            prev => ({
                ...prev,
                distortionVisible: false
            })
        )
    }

    return (
        <>
        <DestortionModalWindow 
            onClose={closeDistortionViewModal}
            visible={visibleState.distortionVisible}
            viewButton={false}

        >
            <DistortionDescriptionView  distortion={distortionView}/>
        </DestortionModalWindow>
        <DestortionModalWindow 
            onClose={() => switchVisibleStates('deleteModalVisible')}
            visible={visibleState.deleteModalVisible}
            viewButton={false}
        >
            <DeleteConfirm loading={deleteFormLoading} onAccept={onDeleteRecord} onCancel={() => switchVisibleStates('deleteModalVisible')}/>
        </DestortionModalWindow>

        <SafeAreaView style={styles.container}>
            <View style={styles.circleBackground}>
                <View style={styles.circleTop} />
                <View style={styles.circleBottom} />
                <View style={styles.circleSmall} />
            </View>
            <View style={styles.header}>
                <Pressable   style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={ColorTheme.gray_dark} />
                </Pressable>
                
                <Text style={styles.headerTitle}>Запись</Text>
                
                <View style={styles.headerActions}>
                    <Pressable onPress={toEditForm}  style={styles.actionButton}>
                        <Ionicons name="create-outline" size={24} color={ColorTheme.gray_dark} />
                    </Pressable>
                    
                    <Pressable onPress={() => switchVisibleStates('deleteModalVisible')} style={[styles.actionButton, styles.deleteButton]}>
                        <Ionicons name="trash-outline" size={24} color={ColorTheme.error} />
                    </Pressable>
                </View>
            </View>
            
        
            <ScrollView style={styles.content}>
                
                <View style={styles.metaContainer}>
                    
                    <View style={styles.dateContainer}>
                        <Text style={styles.date}>
                            {formatDate(record.date)}
                        </Text>
                        <Ionicons style={styles.dateIcon} name='calendar'/>
                    </View>
                    
                    <View style={styles.distortionsContainer}>
                        {record.distortions.map(distortion => (
                            <TouchableOpacity onPress={() => openDistortionViewModal(distortion.id)} key={distortion.id} style={styles.distortionBadge}>
                                <Text style={styles.distortionText}>
                                    {distortion.name}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
                
                
                <View style={styles.section}>
                    <View style={styles.sectionTitleBorderItem}>
                        <Text style={styles.sectionTitle}>Ситуация</Text>
                    </View>
                    <Text style={styles.sectionContent}>
                        {record.situation}
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <View style={styles.sectionTitleBorderItem}>
                         <Text style={styles.sectionTitle}>Автоматические мысли</Text>
                    </View>
                   
                    <Text style={styles.sectionContent}>
                        {record.automaticThoughts}
                    </Text>
                </View>
                
                <View style={styles.section}>
                    <View style={styles.sectionTitleBorderItem}>
                        <Text style={styles.sectionTitle}>Контраргументы</Text>
                    </View>
                    
                    <Text style={styles.sectionContent}>
                        {record.contestation}
                    </Text>
                </View>
                
                <View style={[styles.section,{
                    marginBottom: 80
                }]}>
                    <View style={styles.sectionTitleBorderItem}>
                        <Text style={styles.sectionTitle}>Эмоции</Text>
                    </View>
                    <View style={styles.emotionsContainer}>
                        {record.emotions.map(emotion => (
                            <View key={emotion.id} style={styles.emotionBadge}>
                                <Text style={styles.emotionText}>
                                    {emotion.name}
                                </Text>
                                <View style={styles.emotionTextIntensivityContainer}>
                                    <Text style={styles.emotionTextIntensivity}>
                                        {emotion.intensivity}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
        </>
       
        
    )
}