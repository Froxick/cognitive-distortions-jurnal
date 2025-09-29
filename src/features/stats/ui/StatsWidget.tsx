import { Text, View } from "react-native"
import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../style/Colors";

interface StaticWidgetProps {
    totalRecord: number,
    streakRecord: number,
    todayRecord: number, 
    // loading: boolean
}
export const StatsWidget = ({totalRecord,streakRecord,todayRecord} : StaticWidgetProps) => {
    return(
        <View style={StaticWidgetStyles.container}>
            <View style={StaticWidgetStyles.contentContainer}> 
                <Text style={StaticWidgetStyles.textTitle}>
                    {totalRecord}
                </Text>
                <Text style={StaticWidgetStyles.descText}>
                    Всего
                </Text>
            </View>
            <View style={StaticWidgetStyles.contentContainer}>
                <Text style={StaticWidgetStyles.textTitle}>
                    {streakRecord}
                </Text>
                 <Text style={StaticWidgetStyles.descText}>
                    Серия
                </Text>
            </View>
            <View style={StaticWidgetStyles.contentContainer}>
                <Text style={StaticWidgetStyles.textTitle}>
                    {todayRecord}
                </Text>
                 <Text style={StaticWidgetStyles.descText}>
                    Сегодня
                </Text>
            </View>
            
         
        </View>
    )
}

export const StaticWidgetStyles = StyleSheet.create({
    container: {
        width: 340,
        height: 110,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
        flexDirection: 'row',
        gap: 70,
        justifyContent: 'center'
    },
    textTitle: {
        color: ColorTheme.main_color,
        fontSize: 34,
        fontWeight: '700'
    },
    descText: {
        color: '#898989',
        
    },
    contentContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})