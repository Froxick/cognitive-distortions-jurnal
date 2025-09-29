import { Emotion, JurnalRecord, JurnalRecordCardData, JurnalRecordDistortionData, JurnalRecordEmotionCardData } from "../../features/Jurnal/types/JurnalTypes"
import { DistortionType } from "../../navigation/types/navigation"

interface ParseRecordDataToCardTypes {
    distortions: DistortionType[],
    item: JurnalRecord,
    emotions: Emotion[]
}
export const ParseRecordDataToCard = 
    ({distortions, item, emotions}: ParseRecordDataToCardTypes) : JurnalRecordCardData => {
        const distortionMap = new Map(distortions.map(d => [d.id, d]));
        const emotionMap = new Map(emotions.map(e => [e.id, e]));

        const recordDate = new Date(item.date);

        const distortionData: JurnalRecordDistortionData[] = 
            item.destortionUid.map(id => {
                const distortion = distortionMap.get(id);
                return distortion ? 
                    { id: distortion.id, name: distortion.name } : 
                    { id: 'unknown', name: 'Неизвестное искажение' };
            });

        const emotionData: JurnalRecordEmotionCardData[] = 
            item.emotions.map(el => {
                const emotion = emotionMap.get(el.emotionId);
                return emotion ? 
                    { id: emotion.id, name: emotion.name, intensivity: el.intensivity } : 
                    { id: 'unknown', name: 'Неизвестная эмоция', intensivity: 0 };
            });

        return {
            ...item,
            date: recordDate,
            distortions: distortionData,
            emotions: emotionData
        };
}