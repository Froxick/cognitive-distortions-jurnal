import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";

export const CalendarDatePickerStyles = StyleSheet.create({
        modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    calendarContainer: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        paddingBottom: 30,
    },
    dateRangeDisplay: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
    },
    dateRangeText: {
        fontSize: 16,
        color: ColorTheme.gray_dark,
    },
    dateRangeSeparator: {
        marginHorizontal: 10,
        color: ColorTheme.gray_dark,
    },
    calendarButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    calendarButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    cancelButton: {
        backgroundColor: '#f0f0f0',
    },
    applyButton: {
        backgroundColor: ColorTheme.main_color,
    },
    applyButtonText: {
        fontWeight: 'bold',
        color: 'white'
    },
    calendarButtonText: {
        color : ColorTheme.gray_dark,
        fontWeight: 'bold',
    },
})