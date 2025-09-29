import { TouchableOpacity, View } from "react-native"
import { EmotionPickItemType } from "../../types/JurnalTypes"
import { useState } from "react"
import { Text } from "react-native"
import { updateStyles } from "../../styles/styles"
interface EmotionUpdateComponentProps {
    emotion: EmotionPickItemType,
    closeWindow: () => void,
    index: number,
    onUpdateEmotionIntensivity : (index: number,intensivity: number ) => void,
}
export const EmotionUpdateComponent = ({emotion,closeWindow,onUpdateEmotionIntensivity,index}: EmotionUpdateComponentProps) => {
    const[newEmotion,setNewEmotion] = useState<EmotionPickItemType>(emotion)
    const intensivity = [
        1,2,3,4,5,6,7,8,9,10
    ]
    const changeEmotionIntensivityNew = (num: number) => {
        setNewEmotion(prev => ({
            ...prev,
            intensivity: num
        }))
    }
    const cancelChangeIntensivity = () => {
        closeWindow()
    }
    const completeChangeIntensivity =() => {
        onUpdateEmotionIntensivity(index,newEmotion.intensivity)
        closeWindow()
    }
    return(
        <View style={updateStyles.container}>
            <Text style={updateStyles.title}>
                {emotion.name}
            </Text>
            <Text style={updateStyles.intensityLabel}>Выберите интенсивность:</Text>
            
            <View style={updateStyles.intensityContainer}>
                {intensivity.map((value, idx) => (
                    <TouchableOpacity 
                        key={idx}
                        style={[
                            updateStyles.intensityItem,
                            value === newEmotion.intensivity && updateStyles.intensitySelected
                        ]}
                        onPress={() => changeEmotionIntensivityNew(value)}
                    >
                        <Text style={[
                            updateStyles.intensityText,
                            value === newEmotion.intensivity && updateStyles.intensityTextSelected
                        ]}>
                            {value}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            
            <View style={updateStyles.buttonContainer}>
                <TouchableOpacity
                    style={[updateStyles.button, updateStyles.cancelButton]}
                    onPress={cancelChangeIntensivity}
                >
                    <Text style={updateStyles.buttonText}>Отмена</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[updateStyles.button, updateStyles.confirmButton]}
                    onPress={completeChangeIntensivity}
                >
                    <Text style={updateStyles.buttonText}>Сохранить</Text>
                </TouchableOpacity>
            </View>
        </View>
        // <View>
        //     <Text>
        //             {
        //                 emotion.name
        //             }
        //     </Text>
        //     <View>
        //         {
        //             intensivity.map((el,index) => (
        //                 <TouchableOpacity key={index}
        //                     onPress={() => changeEmotionIntensivityNew(el)}
        //                 >
        //                     {el}
        //                 </TouchableOpacity>
        //             ))
        //         }
        //     </View>
        //     <View>
        //                     <TouchableOpacity
        //                         onPress={() => cancelChangeIntensivity()}
        //                     >
        //                         <Text>
        //                             Отмена
        //                         </Text>
        //                     </TouchableOpacity>
        //                     <TouchableOpacity
        //                         onPress={() => completeChangeIntensivity()}
        //                     >
        //                         <Text>
        //                             Готово
        //                         </Text>
        //                     </TouchableOpacity>
        //     </View>
        // </View>
    )
}