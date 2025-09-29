import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { DistortionType } from '../navigation/types/navigation';
import { ColorTheme } from '../style/Colors';

interface DistirtionCardProps {
    distortion: DistortionType,
    onPress: () => void
}
export const DistortionCard = ({ distortion, onPress }: DistirtionCardProps) => {
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.card, 
            { transform: [{ scale: pressed ? 0.98 : 1 }] }
        ]}>
            <View>
                <Text style={styles.title}>{distortion.name}</Text>
                <Text style={styles.description}>{distortion.description}</Text>
                <Text style={styles.example}>Пример: {distortion.example}</Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#f6f2f7',
        padding: 16,
        marginHorizontal: 3,
        marginVertical: 3,
        marginBottom: 8,
        borderRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: ColorTheme.font_colors.title_card,
    },
    description: {
        color: ColorTheme.font_colors.disc_card,
        marginTop: 4,
    },
    example: {
        color: ColorTheme.font_colors.example_card, 
        marginTop: 8,
        fontSize: 14,
    }
});