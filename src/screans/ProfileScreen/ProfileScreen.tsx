

import {  ActivityIndicator, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { ProfileScreenStyles } from "./ProfileScreenStyle"
import { useAuth } from "../../features/Auth/hooks/useAuthContext"
import { Image } from "expo-image"
import { Ionicons } from '@expo/vector-icons';
import { StatisticItem } from "../../features/stats/ui/StatisticItem/StatisticItem";
import { ButtonWidget } from "../../components/ButtonWidget/ButtonWidget";
import { ColorTheme } from "../../style/Colors";
import { useStatsHook } from '../../features/stats/hooks/useStatsHook';

export interface IStaticItem {
    title: string,
    value: number | string,
    icon: keyof typeof Ionicons.glyphMap
}


export const ProfileScreen = () => {
    const {user,userProfile,signOut} = useAuth()
    const {userStats,todayRecordCount,statsLoading} = useStatsHook()
    const statsStatic : IStaticItem[] = [
        {
            title: 'Количество записей',
            value: userStats?.recordCount as number,
            icon: 'journal'
        },
        {
            title: 'Записей сегодня',
            value: todayRecordCount,
            icon: 'journal-sharp'
        },
        {
            title: 'Дней подряд',
            value: userStats?.streakRecord.count as number,
            icon: 'calendar'
        },{
            title: 'Рекордная серия',
            value: userStats?.streakRecord.longCount as number,
            icon: 'calendar-number-outline'
        },
    ]
    return(
        <View style={ProfileScreenStyles.container}>
            <ScrollView >
                 <View style={ProfileScreenStyles.infoContainer}>
                <View style={ProfileScreenStyles.infoContainerImageView}>
                    <Image source={require('../../../assets/book2.svg')} style={{width: 100, height: 100}}/>
                </View>
                <View style={ProfileScreenStyles.infoContainerText}>
                    <Text style={ProfileScreenStyles.infoContainerTextName}>
                        {userProfile?.displayName}
                    </Text>
                    <Text style={ProfileScreenStyles.infoContainerTextEmail}>
                        {userProfile?.email}
                    </Text>
                </View>
            </View>
            <View style={ProfileScreenStyles.statisticContainer}>
                <View style={ProfileScreenStyles.statisticContainerTitleView}>
                    <Text style={ProfileScreenStyles.statisticContainerTitleText}>
                        Ваша статистика
                    </Text>
                </View>
                 <View style={ProfileScreenStyles.statisticContainerContentView}>
                    {
                        statsLoading ? <ActivityIndicator size={'large'}/> : 
                            statsStatic.map((item,index) => (
                            <StatisticItem key={index} title={item.title} value={item.value} icon={item.icon}/>
                        ))
                    }
                </View>
                <View>

                </View>
            </View>
            <View style={ProfileScreenStyles.leaveButtonContainer}>
                <TouchableOpacity
                        style={ProfileScreenStyles.logoutButton}
                        onPress={signOut}
                    >
                        <Text style={ProfileScreenStyles.logoutButtonText}>Выйти из аккаунта</Text>
                        <Ionicons name="log-out-outline" size={24} color={ColorTheme.error} />
                </TouchableOpacity>
            </View>
            </ScrollView>
        </View>
    )
}
