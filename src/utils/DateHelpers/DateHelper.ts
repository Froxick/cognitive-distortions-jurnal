import { JurnalRecord } from "../../features/Jurnal/types/JurnalTypes";
import { format, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
export const formatDateShort = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  });
};

export const getDayDifference = (date1: Date, date2: Date): number => {
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  
  
  const utc1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const utc2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  
  
  return Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
};

export const convertFirestoreDate = (date: any): Date | null => {
            if (!date) return null;
            
        
            if (date.toDate) {
            return date.toDate();
            }
            
            
            if (typeof date === 'string') {
            return new Date(date);
            }
            
            
            if (date instanceof Date) {
            return date;
            }
            
            console.error('Неизвестный формат даты:', date);
            return null;
        };

export const groupRecordsByDate = (records: JurnalRecord[]) => {
    const grouped: { [key: string]: JurnalRecord[] } = {};
    
    records.forEach(record => {
        const dateKey = format(record.date, 'yyyy-MM-dd');
        
        if (!grouped[dateKey]) {
            grouped[dateKey] = [];
        }
        
        grouped[dateKey].push(record);
    });
    
    return Object.keys(grouped).map(date => ({
        title: date,
        data: grouped[date]
    }));
};

export const formatDateHeader = (dateString: string) => {
    const date = parseISO(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (format(date, 'yyyy-MM-dd') === format(today, 'yyyy-MM-dd')) {
        return 'Сегодня';
    }
    
    if (format(date, 'yyyy-MM-dd') === format(yesterday, 'yyyy-MM-dd')) {
        return 'Вчера';
    }
    
    return format(date, 'd MMMM yyyy', { locale: ru });
};

export const formatDateDisplay = (date?: Date) => {
        if (!date) return '';
        return format(date, 'dd MMM yyyy', { locale: ru });
    };