import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { MarkedDates } from "../../hooks/useCalendarHook"
import { Calendar } from 'react-native-calendars';
import { ColorTheme } from "../../../../style/Colors";
import { formatDateDisplay } from "../../../../utils/DateHelpers/DateHelper";
import { CalendarDatePickerStyles } from "./CalendarDatePicker.style";
interface CalendarDatePicker {
    markedDates: MarkedDates,
    visible: boolean,
    onClose: () => void,
    dateRange: {start?: Date; end?: Date},
    handleDayPress: (day: any) => void,
    applyDateFilters : () => void,
    clearDateFilters: () => void
}
const styles = CalendarDatePickerStyles
export const CalendarDatePicker = ({visible,markedDates,onClose,
    dateRange,handleDayPress,applyDateFilters,clearDateFilters
} : CalendarDatePicker) => {
        return (
              <Modal 
            visible={visible}
            animationType='fade'
            transparent={true}
            onRequestClose={onClose}
            
        >
            <View style={styles.modalOverlay}>
                <TouchableWithoutFeedback onPress={onClose}>
                          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
                </TouchableWithoutFeedback>
                <View style={styles.calendarContainer}>
                    <Calendar
                        markingType="period"
                        markedDates={markedDates}
                        onDayPress={handleDayPress}
                        theme={{
                            calendarBackground: '#fff',
                            textSectionTitleColor: ColorTheme.gray_dark,
                            selectedDayBackgroundColor: ColorTheme.main_color,
                            selectedDayTextColor: '#fff',
                            todayTextColor: ColorTheme.main_color,
                            dayTextColor: ColorTheme.gray_dark,
                            textDisabledColor: '#d9d9d9',
                            arrowColor: ColorTheme.main_color,
                            monthTextColor: ColorTheme.gray_dark,
                            textDayFontFamily: 'Roboto-Regular',
                            textMonthFontFamily: 'Roboto-Bold',
                            textDayHeaderFontFamily: 'Roboto-Medium'
                        }}
                    />
                     <View style={styles.dateRangeDisplay}>
                        <Text style={styles.dateRangeText}>
                            {dateRange.start ? formatDateDisplay(dateRange.start) : 'Начальная дата'}
                        </Text>
                        <Text style={styles.dateRangeSeparator}>—</Text>
                        <Text style={styles.dateRangeText}>
                            {dateRange.end ? formatDateDisplay(dateRange.end) : 'Конечная дата'}
                        </Text>
                    </View>
                    
                    <View style={styles.calendarButtons}>
                        <TouchableOpacity 
                            onPress={clearDateFilters} 
                            style={[styles.calendarButton, styles.cancelButton]}
                        >
                            <Text style={styles.calendarButtonText}>Сбросить</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity 
                            onPress={applyDateFilters} 
                            style={[styles.calendarButton, styles.applyButton]}
                        >
                            <Text style={styles.applyButtonText}>Применить</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </Modal>
        )
      
    
}