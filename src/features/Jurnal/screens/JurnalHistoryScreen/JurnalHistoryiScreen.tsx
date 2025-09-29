import { ActivityIndicator, FlatList, SectionList, Text, TouchableOpacity, View } from "react-native";
import { ParseRecordDataToCard } from "../../../../utils/ParseRecordDataToCard/ParseRecordDataToCard";
import { useDistortionContext } from "../../../destortion/hooks/destortionContext";
import { RecordCard } from "../../components/RecordCard/RecordCard";
import { IJuralHookGetFilters, useJurnal } from "../../hooks/useJurnalHook";
import { JurnalHistoryStyles } from "./JurnalHistoryScreen.style";
import { JurnalRecord, JurnalRecordCardData } from "../../types/JurnalTypes";
import { emotions } from "../../data/Emotion";
import { Ionicons } from '@expo/vector-icons';
import { formatDateDisplay, formatDateHeader, groupRecordsByDate } from "../../../../utils/DateHelpers/DateHelper";
import { ColorTheme } from "../../../../style/Colors";
import { useState } from "react";
import { DestortionModalWindow } from "../../ui/DestortionModalWindow/DestortionModalWindow";
import { DestortionSelector } from "../../ui/DestortionSelector/DestortionSelector";
import { distortions } from '../../../../../firebase-seeder/src/data/distortion';
import { DistortionFilterSelector } from "../../ui/DistortionFilterSelector/DistortionFilterSelector";
import { useCalendarHook } from "../../hooks/useCalendarHook";
import { CalendarDatePicker } from "../../ui/CalendarDatePicker/CalendarDatePicker";
import { JurnalHistoryScreenProps } from "../../../../navigation/types/navigation";

interface IVisiblePickers  {
    distortionVisible: boolean,
    dateCalendarVisible: boolean
}

export const JurnalHistoryScreen = ({navigation} : JurnalHistoryScreenProps) => {
    const styles = JurnalHistoryStyles;
    const { jurnal, getRecords, loading, loadMoreRecords, hasMoreRecords, loadingMoreRecords,applyFilters } = useJurnal();
    const { distortions } = useDistortionContext();
    const {clearDateFilter,markedDates,dateRange,handleDayPress} = useCalendarHook()
    const[distortionPickUid,setDistortionPickUid] = useState<string | null>(null)
    const[visible,setVisible] = useState<IVisiblePickers>({
        dateCalendarVisible: false,
        distortionVisible: false
    })

    const clearCalendarFilters = () => {
        clearDateFilter()
        const filters : IJuralHookGetFilters = {
            distortionUid: distortionPickUid || undefined,
        }
        applyFilters(filters)
        setVisible(
            prev => ({
                ...prev,
                dateCalendarVisible: false
            })
        )
    }
    const toEditCard = (record: JurnalRecordCardData) => {
        navigation.navigate('RecordDetail',{record,backScreen: 'JurnalHistory'})
    }
    const applyDateFilters = () => {
        swtichVisible('dateCalendarVisible')
        const filters: IJuralHookGetFilters = {
            distortionUid: distortionPickUid || undefined,
            dateFrom: dateRange.start,
            dateTo: dateRange.end
        }
        applyFilters(filters)
    }

    

    const swtichVisible = (field: keyof IVisiblePickers) => {
        setVisible(
            prev => ({
                ...prev,
                [field]: !prev[field]
            })
        )
    }

    const toggleDistortionUid = (id: string) => {
        setDistortionPickUid(id)
        setVisible(prev => ({
            ...prev,
            distortionVisible: false
        }))
        const filters : IJuralHookGetFilters = {
            distortionUid: id
        }
        applyFilters(filters)
        
    }
    const clearDistortionFilter = () => {
        setDistortionPickUid(null)
        getRecords()
        
    }


    const groupedRecords = groupRecordsByDate(jurnal || []);

    const handleLoadMore = () => {
        if (!loadingMoreRecords && hasMoreRecords) {
            loadMoreRecords();
        }
    };

    const renderItem = ({ item }: { item: JurnalRecord }) => {
        const recordData = ParseRecordDataToCard({ item, emotions, distortions });
        return (
            <View style={styles.cardItem}>
                <RecordCard filterDistortionUid={distortionPickUid ? distortionPickUid : undefined} record={recordData} onPress={() => toEditCard(recordData)} />
            </View>
        );
    };

    const renderSectionHeader = ({ section: { title } }: any) => (
        <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>
                {formatDateHeader(title)}
            </Text>
        </View>
    );

    const renderFooter = () => {
        if (!loadingMoreRecords) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size={'small'} color={ColorTheme.main_color} />
            </View>
        );
    };

    const renderEmptyList = () => (
        <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Нет записей</Text>
        </View>
    );

    return (
       <>

       <DestortionModalWindow
            onClose={() => swtichVisible('distortionVisible')}
            viewButton={false}
            visible={visible.distortionVisible}
       >

            <DistortionFilterSelector 
                selected={distortionPickUid}
                onToggle={toggleDistortionUid}
                distortions={distortions}
            />
       </DestortionModalWindow>
       <CalendarDatePicker 
        onClose={() => swtichVisible('dateCalendarVisible')}
        clearDateFilters={clearCalendarFilters}
        applyDateFilters={applyDateFilters}
        dateRange={dateRange}
        markedDates={markedDates}
        visible={visible.dateCalendarVisible}
        handleDayPress={handleDayPress}
       />
        <View style={styles.mainContainer}>
           
           <View style={styles.headerContainer}>
                <View>
                    <Text style={styles.screenTitle}>История записей</Text>
                </View>
                <View style={styles.filtersContainer}>
                    <View style={styles.distortionFilterFlex}>

                        <TouchableOpacity onPress={() => swtichVisible('distortionVisible')} style={[
                            styles.distortionFilterContainer,
                            distortionPickUid ? {backgroundColor: '#d5caf9ff'} : {backgroundColor: '#ddddddff'}
                        ]}>
                            <Text numberOfLines={1}>
                                {distortionPickUid ? distortions.find(el => el.id === distortionPickUid)?.name : 'Искажения'}
                            </Text>
                        </TouchableOpacity>
                        {
                            distortionPickUid && (
                                <TouchableOpacity onPress={clearDistortionFilter} style={styles.filterClearButton}>
                                    <Ionicons style={styles.filterClearIcon} name='close' color={'#cf2323ff'}/>
                                </TouchableOpacity>
                            ) 
                        }
                    </View>
                     <View style={styles.dateFilterFlex}>
                        <TouchableOpacity 
                            onPress={() => swtichVisible('dateCalendarVisible')} 
                            style={[styles.dateFilterContainer, {
                                backgroundColor: (dateRange.end || dateRange.start) ? '#d1c2f5ff' : '#f0f0f0'
                            }]}
                        >
                            <Ionicons name="calendar" size={20} color={(dateRange.start || dateRange.end) ? 
                                ColorTheme.main_color :
                                ColorTheme.gray_dark} />
                          
                        </TouchableOpacity>
                     
                    </View>
                    
                </View>
            </View>
         
            <View style={styles.contentContainer}>
                {loading && !jurnal?.length ? (
                    <ActivityIndicator size={'large'} color={ColorTheme.main_color} />
                ) : (
                    <SectionList
                        sections={groupedRecords}
                        keyExtractor={item => item.uid}
                        renderItem={renderItem}
                        renderSectionHeader={renderSectionHeader}
                        onEndReached={handleLoadMore}
                        onEndReachedThreshold={0.1}
                        ListFooterComponent={renderFooter}
                        ListEmptyComponent={renderEmptyList}
                        contentContainerStyle={styles.listContent}
                        style={styles.listStyle}
                    />
                )}
            </View>
        </View>

       </>
    );
};
