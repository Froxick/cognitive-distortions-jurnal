import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native"
import { EmotionJurnal, EmotionPickItemType, JurnalFieldType, JurnalRecordFormData, JurnalRecordFormErros } from "../../types/JurnalTypes"
import { DistortionType } from "../../../../navigation/types/navigation"
import { DestortionModalWindow } from "../DestortionModalWindow/DestortionModalWindow"
import { DestortionSelector } from "../DestortionSelector/DestortionSelector"
import { distortions } from '../../../../testData/destortions';

import { ColorTheme } from "../../../../style/Colors"
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view"
import { RecordCreateFormStyles } from "./RecordCreateForm.style"
import { modalVisibleStateType } from "../../components/RecordForm"
import { EmotionSelector } from "../EmotionSelector/EmotionSelector"
import { emotions } from "../../data/Emotion"
import { EmotionListPicker } from "../../components/EmotionListPicker/EmotionListPicker"
import { EmotionUpdateComponent } from "../../components/EmotionUpdateComponent/EmotionUpdateComponent"
import { useState } from "react"
interface RecordCreateFormProps {
    data: JurnalRecordFormData,
    selectEmotion: EmotionJurnal[],
    destorionSelectList: string[],
    destortions: DistortionType[]
    setData: (field: JurnalFieldType,value: string) => void,
    errorsForm: JurnalRecordFormErros,
    errorServer: string | null
    onSubmit: () => void,
    switchVisible: (field: keyof modalVisibleStateType) => void,
    visible: {
        distortionModal: boolean,
        emotionModal: boolean,
        emotionUpdateModal: boolean
    },
    openUpdateModal: (data: EmotionPickItemType) => void,
    closeUpdateModal : () => void,
    toggleDestorion: (uid: string) => void,
    onDeleteEmotion : (index: number) => void,
    onUpdateEmotionIntensivity : (index: number,intensivity: number ) => void,
    onAddEmotion : (id: string) => void,
    updateEmotion: EmotionPickItemType,
    createFormLoading: boolean,
    isEdit: boolean
}
export const RecordCreateForm = ({
    data,setData,
    errorsForm,onSubmit,
    switchVisible,visible,
    destorionSelectList,destortions,
     errorServer, toggleDestorion,
     openUpdateModal,closeUpdateModal,
     selectEmotion, onDeleteEmotion,
     onAddEmotion,onUpdateEmotionIntensivity,
     updateEmotion,createFormLoading, isEdit
    } : RecordCreateFormProps) => {
   
    

    const [focusedField, setFocusedField] = useState<JurnalFieldType | null>(null);

    
    const handleFocus = (field: JurnalFieldType) => {
        setFocusedField(field);
    };

   
    const handleBlur = () => {
        setFocusedField(null);
    };
    
    const getSelectedDistortionNames = () => {
        return destorionSelectList.map(uid => {
            const distortion = destortions.find(d => d.id === uid);
            return distortion ? distortion.name : "Unknown";
        });
    };

    return (
          <>
             <DestortionModalWindow
                    visible={visible.distortionModal}
                    onClose={() => switchVisible('distortionModal')}
                    viewButton={true}
                >
                    <DestortionSelector 
                        destortions={destortions}
                        onToggle={toggleDestorion}
                        selected={destorionSelectList}
                    />
             </DestortionModalWindow>
             <DestortionModalWindow
                viewButton={false}
                visible={visible.emotionModal}
                onClose={() => switchVisible('emotionModal')}
             >
                <EmotionListPicker 
                    emotionList={emotions}
                    onClose={() => switchVisible('emotionModal')}
                    selectEmotion={selectEmotion}
                    onAddEmotion={onAddEmotion}
                    onDeleteEmotion={onDeleteEmotion}
                    onUpdateEmotionIntensivity={onUpdateEmotionIntensivity}
                />
             </DestortionModalWindow>
             <DestortionModalWindow 
                visible={visible.emotionUpdateModal}
                onClose={closeUpdateModal}
                viewButton={false}
             >
                <EmotionUpdateComponent 
                    emotion={updateEmotion}
                    closeWindow={closeUpdateModal}
                    index={selectEmotion.findIndex(el => el.emotionId === updateEmotion.emotionId)}
                    onUpdateEmotionIntensivity={onUpdateEmotionIntensivity}
                />   
             </DestortionModalWindow>

              <KeyboardAwareScrollView
                style={styles.container}
                contentContainerStyle={{ flexGrow: 1 }}
                enableOnAndroid={true}
                extraScrollHeight={30}
                keyboardShouldPersistTaps="handled"
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
            
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{
                                isEdit ? 'Редактирование записи в дневнике' : ' Новая запись в дневнике'
                            }</Text>
                        <Text style={styles.titleSub}>Заполните все поля для анализа</Text>
                    </View>
                    
                   
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Ситуация</Text>
                        <TextInput
                            style={[
                                styles.input, 
                                focusedField === 'situation' && styles.inputFocused,
                                errorsForm.situation && styles.inputError
                            ]}
                            placeholder="Опишите ситуацию, которая вызвала негативные эмоции"
                            placeholderTextColor={ColorTheme.gray_medium}
                            multiline
                            numberOfLines={4}
                            value={data.situation}
                            onChangeText={(text) => setData('situation', text)}
                            onFocus={() => handleFocus('situation')}
                            onBlur={handleBlur}
                        />
                        {errorsForm.situation && (
                            <Text style={styles.errorText}>{errorsForm.situation}</Text>
                        )}
                    </View>
                    
                    
                    <View style={styles.sectionDivider} />
                    
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Автоматические мысли</Text>
                        <TextInput 
                            style={[
                                styles.input, 
                                focusedField === 'automaticThoughts' && styles.inputFocused,
                                errorsForm.automaticThoughts && styles.inputError
                            ]}
                            placeholder="Какие автоматические мысли возникли?"
                            placeholderTextColor={ColorTheme.gray_medium}
                            multiline
                            numberOfLines={4}
                            value={data.automaticThoughts}
                            onChangeText={(text) => setData('automaticThoughts', text)}
                            onFocus={() => handleFocus('automaticThoughts')}
                            onBlur={handleBlur}
                        />
                        {errorsForm.automaticThoughts && (
                            <Text style={styles.errorText}>{errorsForm.automaticThoughts}</Text>
                        )}
                    </View>
                    
                  
                    <View style={styles.sectionDivider} />
                    
                    
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Опровержение</Text>
                        <TextInput
                            style={[
                                styles.input, 
                                focusedField === 'contestation' && styles.inputFocused,
                                errorsForm.contestation && styles.inputError
                            ]}
                            placeholder="Как вы можете оспорить свои автоматические мысли?"
                            placeholderTextColor={ColorTheme.gray_medium}
                            multiline
                            numberOfLines={4}
                            value={data.contestation}
                            onChangeText={(text) => setData('contestation', text)}
                            onFocus={() => handleFocus('contestation')}
                            onBlur={handleBlur}
                        />
                        {errorsForm.contestation && (
                            <Text style={styles.errorText}>{errorsForm.contestation}</Text>
                        )}
                    </View>
                    
                  
                    <View style={styles.sectionDivider} />
                    
                 
                    <EmotionSelector 
                        emotionList={emotions} 
                        selectEmotion={selectEmotion}  
                        openPicker={() => switchVisible('emotionModal')} 
                        openUpdateModal={openUpdateModal} 
                        onDeleteEmotion={onDeleteEmotion}
                    />
                    
                    
                    <View style={styles.sectionDivider} />
                    
                   
                    <View style={styles.distortionContainer}>
                        <Text style={styles.label}>Когнитивные искажения</Text>
                        
                        <TouchableOpacity
                            style={styles.distortionButton}
                            onPress={() => switchVisible('distortionModal')}
                        >
                            <Ionicons
                                name="color-filter-outline" 
                                size={24} 
                                color={ColorTheme.main_color} 
                                style={styles.distortionIcon}
                            />
                            <Text style={styles.distortionButtonText}>
                                {destorionSelectList.length > 0 
                                    ? `Выбрано: ${destorionSelectList.length} искажений` 
                                    : "Выберите когнитивные искажения"}
                            </Text>
                            <Ionicons 
                                name="chevron-forward" 
                                size={20} 
                                color={ColorTheme.gray_dark} 
                            />
                        </TouchableOpacity>
                        
                        {destorionSelectList.length > 0 && (
                            <View style={styles.selectedContainer}>
                                {getSelectedDistortionNames().map((name, index) => (
                                    <View key={index} style={styles.selectedTag}>
                                        <Text style={styles.selectedTagText}>{name}</Text>
                                        <TouchableOpacity 
                                            onPress={() => toggleDestorion(destorionSelectList[index])}
                                            style={styles.tagClose}
                                        >
                                            <Ionicons name="close" size={16} color="white" />
                                        </TouchableOpacity>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                    
                   
                    <TouchableOpacity 
                        style={[styles.submitButton, 
                            {
                                backgroundColor: createFormLoading ? ColorTheme.gray_medium :
                                    ColorTheme.main_color
                            }
                        ]}
                        onPress={onSubmit}
                        disabled={createFormLoading ? true : false}
                    >
                      {
                        createFormLoading ? <ActivityIndicator size={'small'}/> : 
                          <Text style={styles.submitButtonText}>
                             <Ionicons name="save-outline" size={20} color="white" />{' '}
                             {
                                isEdit ? 'Сохранить изменения ' : 'Создать запись'
                             }
                          </Text>
                      }
                    </TouchableOpacity>
                    
                   
                    {errorServer && (
                        <Text style={styles.serverError}>
                            <Ionicons name="warning-outline" size={16} /> {errorServer}
                        </Text>
                    )}
                </ScrollView>
            </KeyboardAwareScrollView>        
          </>
         
    );
}


const styles = RecordCreateFormStyles