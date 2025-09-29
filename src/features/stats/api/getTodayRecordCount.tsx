import { 
  collection, 
  query, 
  where, 
  getCountFromServer,
  Timestamp 
} from "firebase/firestore";
import { db } from "../../../firebase/config";

export const getTodaysRecordCount = async (userId: string): Promise<number> => {
  const now = new Date();
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endOfDay = new Date(startOfDay);
  endOfDay.setDate(startOfDay.getDate() + 1);

  try {
    const entriesRef = collection(db, "entries");
    const q = query(
      entriesRef,
      where("userUid", "==", userId),
      where("date", ">=", startOfDay),
      where("date", "<", endOfDay) 
    );
    
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.error("Ошибка получения количества записей за сегодня:", error);
    throw error;
  }
};