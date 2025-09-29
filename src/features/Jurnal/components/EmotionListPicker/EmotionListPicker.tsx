import { StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Emotion, EmotionJurnal } from "../../types/JurnalTypes"
import { useState } from "react"
import { pickerStyles } from "../../styles/styles"

interface EmotionListPickerProps {
        emotionList: Emotion[],
        onClose : () => void,
        selectEmotion: EmotionJurnal[],
        onAddEmotion : (id: string) => void,
        onDeleteEmotion : (index: number) => void,
        onUpdateEmotionIntensivity : (index: number,intensivity: number ) => void,
}
export const EmotionListPicker = ({selectEmotion,emotionList,onAddEmotion,
    onDeleteEmotion,onUpdateEmotionIntensivity,
    onClose

} : EmotionListPickerProps) => {
    const [pickEmotion,setPickEmotion] = useState(false)
    const [id,setId] = useState<string | null>(null)
    const intensivity = [
        1,2,3,4,5,6,7,8,9,10
    ]
    
    const pickFnc = (id: string) => {
        onAddEmotion(id)
        setId(id)
        setPickEmotion(true)
    }
    const nameEmotionPick = () => {
        const select = selectEmotion.find(el => el.emotionId === id)
        if(select) {
            const find = emotionList.find(el => el.id === select.emotionId)
            if(find) {
                return find
            }
        }
    }
    const intensivityEmotionPick = () => {
        const select = selectEmotion.find(el => el.emotionId === id)
        return select
    }
    const getIndexPickEmotion = () => {
        return selectEmotion.findIndex(el => el.emotionId === id)
    }

    const cancelEmotionPick = () => {
        onDeleteEmotion(getIndexPickEmotion())
        setId(null)
        setPickEmotion(false)
    }
    const completeEmotionPick = () => {
        setId(null)
        setPickEmotion(false)
        onClose()
    }
    
    return(

         <View style={pickerStyles.container}>
            {pickEmotion === false ? (
                <>
                    <Text style={pickerStyles.title}>Выберите эмоцию</Text>
                    <View style={pickerStyles.gridContainer}>
                        {emotionList.map((el, index) => {
                            const isSelected = selectEmotion.some(item => item.emotionId === el.id)
                            return (
                            <TouchableOpacity
                                disabled={isSelected}
                                key={index}
                                style={[
                                    pickerStyles.emotionCard, 
                                    isSelected && pickerStyles.emotionSelected
                                ]}
                                onPress={() => pickFnc(el.id)}
                            >
                                <Text style={[
                                    pickerStyles.emotionText,
                                    isSelected && pickerStyles.emotionTextSelected
                                ]}>{el.name}</Text>
                            </TouchableOpacity>
                        )
                        })}
                    </View>
                </>
            ) : (
                <View style={pickerStyles.pickerContainer}>
                    <Text style={pickerStyles.selectedTitle}>
                        {nameEmotionPick()?.name}
                    </Text>
                    
                    <Text style={pickerStyles.intensityLabel}>Интенсивность:</Text>
                    <View style={pickerStyles.intensityContainer}>
                        {intensivity.map((value, idx) => (
                            <TouchableOpacity
                                key={idx}
                                onPress={() => onUpdateEmotionIntensivity(getIndexPickEmotion(), value)}
                                style={[
                                    pickerStyles.intensityItem,
                                    value === intensivityEmotionPick()?.intensivity && 
                                        pickerStyles.intensitySelected
                                ]}
                            >
                                <Text style={[
                                    pickerStyles.intensityText,
                                    value === intensivityEmotionPick()?.intensivity && 
                                        pickerStyles.intensityTextSelected
                                ]}>
                                    {value}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    
                    <View style={pickerStyles.buttonContainer}>
                        <TouchableOpacity
                            style={[pickerStyles.button, pickerStyles.cancelButton]}
                            onPress={cancelEmotionPick}
                        >
                            <Text style={pickerStyles.buttonText}>Отмена</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[pickerStyles.button, pickerStyles.confirmButton]}
                            onPress={completeEmotionPick}
                        >
                            <Text style={pickerStyles.buttonText}>Готово</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    pickIntensivity: {

    }
})