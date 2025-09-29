import { Text, TouchableOpacity, View } from "react-native"
import { Emotion, EmotionJurnal, EmotionPickItemType } from '../../types/JurnalTypes';
import { Ionicons } from '@expo/vector-icons';
import { ColorTheme } from "../../../../style/Colors";
import { EmotionSelectorStyles } from "../../styles/styles";
import { useMemo } from "react";


interface EmotionSelectorProps {
    emotionList: Emotion[],
    selectEmotion: EmotionJurnal[],
    // onAddEmotion : (id: string) => void,
    openPicker: () => void,
    openUpdateModal: (data: EmotionPickItemType) => void,
    onDeleteEmotion : (index: number) => void,
    // onUpdateEmotionIntensivity : (index: number,intensivity: number ) => void,
    // onUpdateEmotion : (index: number, id: string) => void
}
export const EmotionSelector = ({...props}: EmotionSelectorProps) => {
    const styles = EmotionSelectorStyles;
    
 
    const selectedEmotions = useMemo(() => {
        return props.selectEmotion.map(item => {
            const emotion = props.emotionList.find(e => e.id === item.emotionId);
            return {
                name: emotion?.name || 'Неизвестная эмоция',
                intensivity: item.intensivity,
                id: item.emotionId
            };
        });
    }, [props.selectEmotion, props.emotionList]);

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>
                Эмоции
            </Text>
            
            <TouchableOpacity
                onPress={props.openPicker}
                style={styles.selectorButton}
            >
                <Ionicons
                    name="heart-outline"
                    size={22}
                    color={ColorTheme.main_color}
                    style={styles.selectorIcon}
                />
                <Text style={styles.selectorText}>
                    {props.selectEmotion.length > 0 
                        ? `Выбрано: ${props.selectEmotion.length}` 
                        : "Добавить эмоции"}
                </Text>
                <Ionicons
                    name="chevron-forward"
                    size={18}
                    color={ColorTheme.gray_dark}
                />
            </TouchableOpacity>
            
            {props.selectEmotion.length > 0 && (
                <View style={styles.selectedContainer}>
                    {selectedEmotions.map((item, index) => (
                        <View key={`${item.id}-${index}`} style={styles.emotionItem}>
                            <TouchableOpacity
                                style={styles.emotionContent}
                                onPress={() => props.openUpdateModal({
                                    emotionId: item.id,
                                    intensivity: item.intensivity,
                                    name: item.name
                                })}
                            >
                                <Text style={styles.emotionName}>{item.name}</Text>
                                <View style={styles.intensityBadge}>
                                    <Text style={styles.intensityText}>{item.intensivity}</Text>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity
                                style={styles.deleteButton}
                                onPress={() => props.onDeleteEmotion(index)}
                            >
                                <Ionicons 
                                    name="close"
                                    size={14}
                                    color="white"
                                />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            )}
        </View>
    )
}