import { Text, View } from "react-native"
import { StaticWidgetStyles } from "./StaticWidgetStyle"
interface StaticWidgetProps {
    total: number,
    day: number,
    today: number
}
export const StaticWidget = ({total,day,today} : StaticWidgetProps) => {
    return(
        <View style={StaticWidgetStyles.container}>
            <View style={StaticWidgetStyles.contentContainer}> 
                <Text style={StaticWidgetStyles.textTitle}>
                    {total}
                </Text>
                <Text style={StaticWidgetStyles.descText}>
                    Всего
                </Text>
            </View>
            <View style={StaticWidgetStyles.contentContainer}>
                <Text style={StaticWidgetStyles.textTitle}>
                    {day}
                </Text>
                 <Text style={StaticWidgetStyles.descText}>
                    Серия
                </Text>
            </View>
            <View style={StaticWidgetStyles.contentContainer}>
                <Text style={StaticWidgetStyles.textTitle}>
                    {today}
                </Text>
                 <Text style={StaticWidgetStyles.descText}>
                    Сегодня
                </Text>
            </View>
            
         
        </View>
    )
}