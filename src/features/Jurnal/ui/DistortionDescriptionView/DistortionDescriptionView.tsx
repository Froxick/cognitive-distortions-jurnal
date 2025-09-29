import { ScrollView, Text, View } from "react-native"
import { DistortionType } from "../../../../navigation/types/navigation"
import { DistortionDescriptionViewStyles } from "./DistortionDescriptionView.style"
import { Ionicons } from '@expo/vector-icons';
import { ColorTheme } from "../../../../style/Colors";
interface DistortionDescriptionViewProps {
    distortion: DistortionType | null,
}
const styles = DistortionDescriptionViewStyles
export const DistortionDescriptionView = ({distortion} : DistortionDescriptionViewProps) => {
     if (!distortion) {
        return (
            <View style={styles.errorContainer}>
                <Ionicons name="warning" size={32} color={ColorTheme.error} />
                <Text style={styles.errorText}>
                    Искажение не найдено
                </Text>
            </View>
        );
    }
    return (
        <ScrollView 
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
        >
            
            <View style={styles.header}>
                <Ionicons 
                    name="warning-outline" 
                    size={24} 
                    color={ColorTheme.main_color} 
                    style={styles.icon}
                />
                <Text style={styles.name}>{distortion.name}</Text>
            </View>
            
            
            <Text style={styles.description}>
                {distortion.description}
            </Text>
            
           
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Пример</Text>
                <View style={styles.exampleCard}>
                    <Ionicons 
                        name="chatbox-ellipses-outline" 
                        size={18} 
                        color={ColorTheme.gray_dark} 
                    />
                    <Text style={styles.exampleText}>
                        {distortion.example}
                    </Text>
                </View>
            </View>
            
          
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Как исправить</Text>
                <View style={styles.solutionCard}>
                    <Ionicons 
                        name="bulb-outline" 
                        size={18} 
                        color={'white'} 
                    />
                    <Text style={styles.solutionText}>
                        {distortion.solution}
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
}