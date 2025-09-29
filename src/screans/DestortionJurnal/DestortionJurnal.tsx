import { ActivityIndicator, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native"
import { DestortionJurnalStyles } from "./DestortionJurnalStyle"
import { Headaer } from "../../components/Header"
import { ColorTheme } from "../../style/Colors"
import { ButtonWidget } from "../../components/ButtonWidget/ButtonWidget"
import { JurnalScreenProps } from "../../navigation/types/navigation"
import { useJurnal } from "../../features/Jurnal/hooks/useJurnalHook"
import { RecordCard } from "../../features/Jurnal/components/RecordCard/RecordCard"
import { useDistortionContext } from "../../features/destortion/hooks/destortionContext"
import { useEffect, useState } from "react"
import { JurnalGuide } from "../../features/Jurnal/ui/JurnalGuide/JurnalGuide"
import { ParseRecordDataToCard } from "../../utils/ParseRecordDataToCard/ParseRecordDataToCard"
import { emotions } from "../../features/Jurnal/data/Emotion"
import { useStatsHook } from "../../features/stats/hooks/useStatsHook"
import { StatsWidget } from "../../features/stats/ui/StatsWidget"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { Ionicons } from '@expo/vector-icons';
import { JurnalRecordCardData } from "../../features/Jurnal/types/JurnalTypes"
import { InfoScreen } from "../info/InfoScreen"
import { InfoWidget } from "../../components/InfoWidget"
import { DestortionSelectorStyles } from "../../features/Jurnal/ui/DestortionSelector/DestortionSelector.style"


export {DestortionJurnalStyles} from './DestortionJurnalStyle'
export const DestortionJurnalScreen = ({navigation} : JurnalScreenProps) => {
    const toCreateForm = () => {
      navigation.navigate('JurnalFormCreate',{})
    }
    const toHistory = () => {
      navigation.navigate('JurnalHistory')
    }
    const toEditCard = (record: JurnalRecordCardData) => {
      navigation.navigate('RecordDetail', {record,backScreen:'MainTabs'})
    }
    
    const {lastRecords,loading} = useJurnal()
    const {userStats,checkStreak,statsLoading, todayRecordCount} = useStatsHook()
    const {distortions} = useDistortionContext()
    const[isBlur,setIsBlur] = useState<boolean>(false)

    useEffect(() => {
      const loadBLurState = async () => {
        try{
          const savedState = await AsyncStorage.getItem('blur')
          if(savedState != null) {
            setIsBlur(JSON.parse(savedState))
          } else{
            await AsyncStorage.setItem('blur',JSON.stringify(isBlur))
          }

        }catch(e){
          console.error('Ошибка при загрузке состояние блюра',e)
        }
      }
      loadBLurState()
    }, [])

    useEffect(() => {
      const savedBlurState = async () => {
        try {
          await AsyncStorage.setItem('blur', JSON.stringify(isBlur))
        }catch(e){
          console.error('Ошибка при сохранении состояние блюра',e)
        }
      }
      savedBlurState()
    },[isBlur])

    useEffect(() => {
       checkStreak(false)
    }, [])

    const switchBlur = () => {
      setIsBlur(!isBlur)
    }
    const navigateToInfoScreen = () => {
      navigation.navigate('InfoScreen')
    }
    const BlurOverlay = () => (
      <View style={DestortionJurnalStyles.blurOverlay}>
        <View style={DestortionJurnalStyles.blurContent}>
          <Ionicons name="lock-closed" size={32} color="#6a45bfff" />
          <Text style={DestortionJurnalStyles.blurText}>Содержимое скрыто</Text>
        </View>
      </View>
    );

    return(
        <SafeAreaView style={DestortionJurnalStyles.container}>
            <ScrollView style={{paddingBottom: 20}}>

            
            <View style={DestortionJurnalStyles.header}>
                <Headaer title="Мой дневник" color={ColorTheme.main_color} size={38} desc="Анализируйте мысли развивайте осознанность" descSize={16}/>
            </View>
            <View style={DestortionJurnalStyles.staticContainer}>
                {
                  statsLoading ? <ActivityIndicator size={'large'}/> : 
                    <StatsWidget totalRecord={userStats?.recordCount as number}
                     streakRecord={userStats?.streakRecord.count as number} 
                     todayRecord={todayRecordCount}
                    />
                }
            </View>
            <View style={DestortionJurnalStyles.buttonContainer}>
                <ButtonWidget onPress={toCreateForm} title="Создать запись" backColor={ColorTheme.main_color} color="white" wight={155} height={50}/>
                <ButtonWidget onPress={toHistory} title="История записей" backColor='#9e89b6' color="white" wight={155} height={50}/>
            </View>
            <View style={{justifyContent:'center',alignItems: 'center'}}>
                <View style={DestortionJurnalStyles.list_container}>
                    <View style={DestortionJurnalStyles.recordsHeader}>
                      <Text style={{color:ColorTheme.main_color, fontSize:28,fontWeight: 'bold', position: 'relative' ,left:-25, top: -10}}>
                          Последние записи
                      </Text>
                      <TouchableOpacity onPress={switchBlur} style={DestortionJurnalStyles.blurButtonIcon}>
                        <Ionicons
                            name={isBlur ? "eye-off-outline" : "eye-outline"} 
                            size={24} 
                            color={ColorTheme.main_color} 
                        />
                      </TouchableOpacity>
                    </View>
                   

                    <View style={{padding: 10}}>
                      {isBlur && (
                          <BlurOverlay />
                      )}
                      {
                      loading ? <ActivityIndicator size={'large'}/> : (
                        <View style={DestortionJurnalStyles.list_view}>
                          {
                            lastRecords?.length === 0 ? <Text>Записей нет</Text> : 
                              lastRecords?.map(item => {
                                const recordData = ParseRecordDataToCard({distortions,item,emotions})
                                return (
                                   <RecordCard key={item.uid} record={recordData} onPress={() => toEditCard(recordData)}/>
                                )
                              })
                          }
                        </View>
                      )
                    }
                    </View>
                    
                 </View>
            </View>
            <View style={DestortionJurnalStyles.infoContainer}>
              <InfoWidget onPress={navigateToInfoScreen} title="Узнайте больше" desc="Что такое когнитивные искажения и как они влияют на наше мышление"/>
            </View>

            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <JurnalGuide />  
            </View>
            
                    
            </ScrollView>
        </SafeAreaView>
    )
}


