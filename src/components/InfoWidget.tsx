import { Image } from "expo-image"
import { Pressable, StyleSheet, Text, View } from "react-native"




interface InfoWidgetProps {
    onPress : () => void
    title: string,
    desc: string
}
export const InfoWidget = ({onPress,title,desc} : InfoWidgetProps) => {
    return( 
        <Pressable onPress={onPress} style={styles.educationCard}>
            <Image
                 source={require('../../assets/Idea_icon.svg')}
                 style={styles.educationIcon}
                 contentFit="contain"
             />
            <View style={styles.educationTextContainer}>
                <Text style={styles.educationTitle}>{title}</Text>
                <Text style={styles.educationText}>
                        {desc}
                </Text>
            </View>
       </Pressable>
    )
}
const styles = StyleSheet.create({
     educationCard: {
        backgroundColor: '#e6defa',
        borderRadius: 16,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    educationIcon: {
        width: 50,
        height: 50,
        marginRight: 15,
    },
    educationTextContainer: {
        flex: 1,
    },
    educationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5d34a9',
        marginBottom: 5,
    },
    educationText: {
        fontSize: 15,
        color: '#5d34a9',
        lineHeight: 22,
    },
})