import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native"
import { ColorTheme } from "../../style/Colors"



interface ButtonWidgetProps {
    backColor: string,
    color: string,
    title: string,
    onPress?: () => void,
    wight: number,
    height: number,
    disabled?: boolean,
    loading?: boolean,
}

export const ButtonWidget =({color,backColor,title,onPress,wight,height,disabled,loading} : ButtonWidgetProps) => {
    
        const ButtonWidgetStyles = StyleSheet.create({
        container: {
            backgroundColor: disabled ? ColorTheme.gray_medium : backColor ,
            height: height,
            width: wight,
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            shadowColor: '#000',
            shadowOffset: { width: 1, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
            elevation: 5, 
        },
        text: {
            color: color,
            textAlign: 'center',
            fontSize: 17,
            fontWeight: 'bold'
        }
    })
    return(
        <Pressable disabled={disabled} onPress={onPress} style= {({pressed}) => [ButtonWidgetStyles.container, {
                      backgroundColor : pressed ? '#b29fde' : backColor}]}>
            {
                loading === true ? <ActivityIndicator size={'small'}/> : 
                <Text style={ButtonWidgetStyles.text}>
                    {title}
                </Text>
            }
        </Pressable>
    )
}
