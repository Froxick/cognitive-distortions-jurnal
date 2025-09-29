import { Text, View } from "react-native"

import { JurnalGuideStyles } from "./JurnalGuide.style"

export const JurnalGuide = () => {
    return(
        <View style={JurnalGuideStyles.card}>
            <Text style={JurnalGuideStyles.cardTitle}>Как использовать дневник</Text>
            <View style={JurnalGuideStyles.step}>
                <View style={JurnalGuideStyles.stepTextContainer}>
                    <Text style={JurnalGuideStyles.stepTitle}>
                        1. Запись ситуации
                    </Text>
                    <Text style={JurnalGuideStyles.stepDescription}>
                        Опишите событие, вызвавшее сильные эмоции
                    </Text>
                </View>
            </View>

            <View style={JurnalGuideStyles.step}>
                <View style={JurnalGuideStyles.stepTextContainer}>
                    <Text style={JurnalGuideStyles.stepTitle}>
                        2. Анализ мыслей
                    </Text>
                    <Text style={JurnalGuideStyles.stepDescription}>
                        Определите автоматические мысли и чувства
                    </Text>
                </View>
            </View>

            <View style={JurnalGuideStyles.step}>
                <View style={JurnalGuideStyles.stepTextContainer}>
                    <Text style={JurnalGuideStyles.stepTitle}>
                        3. Выявление искажений
                    </Text>
                    <Text style={JurnalGuideStyles.stepDescription}>
                        Найдите когнитивные искажения в ваших мыслях
                    </Text>
                </View>
            </View>

            <View style={JurnalGuideStyles.step}>
                <View style={JurnalGuideStyles.stepTextContainer}>
                    <Text style={JurnalGuideStyles.stepTitle}>
                        4. Формулировка альтернатив
                    </Text>
                    <Text style={JurnalGuideStyles.stepDescription}>
                        Создайте более сбалансированный взгляд на ситуацию
                    </Text>
                </View>
            </View>
        </View>
    )
}