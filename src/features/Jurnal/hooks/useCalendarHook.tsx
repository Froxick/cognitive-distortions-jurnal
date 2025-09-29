import { useState } from "react"
import { ColorTheme } from "../../../style/Colors"
import { format } from "date-fns"

export type MarkedDates = {
    [date: string] : {
        selected? : boolean,
        startingDay?: boolean,
        endingDay?: boolean,
        color?: string,
        textColor?: string
    }
}

export const useCalendarHook = () => {
    const [dateRange,setDateRange] = useState<{start?: Date; end?: Date}>({})
    const [markedDates,setMarkedDates] = useState<MarkedDates>({})

    const handleDayPress = (day: any) => {
        const date = new Date(day.timestamp)

        if(!dateRange.start || (dateRange.start && dateRange.end)){
            setDateRange({start: date})
            setMarkedDates({
                [day.dateString] : {
                    selected: true,
                    startingDay: true,
                    color: ColorTheme.main_color
                }
            })
        }
        else if (dateRange.start && !dateRange.end) {
            const start = date < dateRange.start ? date : dateRange.start
            const end = date < dateRange.start ? dateRange.start : date

            setDateRange({start,end});

            const newMarkedDates: MarkedDates = {}
            const current = new Date(start)

            while(current <= end) {
                const dateStr = format(current, 'yyyy-MM-dd')
               newMarkedDates[dateStr] = {
                    selected: true,
                    color: ColorTheme.main_color,
                    ...(dateStr === format(start, 'yyyy-MM-dd') && { startingDay: true }),
                    ...(dateStr === format(end, 'yyyy-MM-dd') && { endingDay: true })
                };

                current.setDate(current.getDate() + 1)
            }
            setMarkedDates(newMarkedDates)
        }
    }

    const clearDateFilter = () => {
        setDateRange({})
        setMarkedDates({})
    }

    return {
        clearDateFilter,handleDayPress,dateRange,markedDates
    }
}