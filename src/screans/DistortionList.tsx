
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, Text, View } from "react-native"
import { DistortionListTabProps, RootStackParamList, DistortionType } from '../navigation/types/navigation';
import { DistortionCard } from "../components/DistortionCard"
import { useEffect, useState } from "react"
import { DistortionSearch } from "../components/DistortionSearch"
import { useDistortions } from "../hooks/useDestortion"


export const DistortionListScrean =  ({navigation} : DistortionListTabProps) => {
    const {distortions,loading,errors,refreshing,refreshingFnc} = useDistortions()

    const refreshListFnc =  async () => {
        await refreshingFnc()
    }
    const [text,setText] = useState('')

    const[filterData,setFilterData] = useState< DistortionType[]>(distortions)
    useEffect(() => {
        setFilterData(distortions)
   },[distortions])
    const searchFnc = (query : string) => {
        if(!query){
            setFilterData(distortions)
            setText('')
            return
        }
        const filtered_data = distortions.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        setText(query)
        setFilterData(filtered_data)

    }
    if(loading && !refreshing) {
        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <ActivityIndicator size="large" />
            </View>
        )
    }
    if(errors) {
        return(
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{textAlign: 'center', color: 'red', fontSize: 20}}>
                    {errors}
                </Text>
            </View>
        )
    }
    return(
        <View style= {styles.container}>
            <DistortionSearch value_search={text} fnc_search={searchFnc}/>
            <Text style={styles.count_text} >
                Найдено искажений: {filterData.length}
            </Text>
            <FlatList 
                data={filterData}
                keyExtractor={item => item.id}
                renderItem={({item}) => (
                    <DistortionCard distortion={item} onPress={() => navigation.navigate('DistortionDetail', {distortion: item})}/>
                )}

                refreshControl={
                <RefreshControl
                refreshing={refreshing}
                onRefresh={refreshListFnc} 
                colors={['#4a86e8']} 
                tintColor="#4a86e8"
                />
            }
            />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        padding: 16, 
    },
    separator: {
        height: 15, 
    },
    count_text: {
        fontSize: 14,
        textAlign: 'center',
        color: 'grey',
        marginBottom: 20
    }
});
