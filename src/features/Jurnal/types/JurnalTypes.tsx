export interface JurnalRecord {
    uid: string,
    situation: string,
    contestation: string,
    destortionUid: string[],
    automaticThoughts: string; 
    emotions: EmotionJurnal[];  
    userUid: string,
    date: any | Date,
}
export interface JurnalHookErrors  {
    getErrors: string,
    createErrors: string,
    deleteErrors: string,
    editErrors: string
}
export interface Emotion {
    id: string,
    name: string
}

export interface EmotionJurnal {
    emotionId: string,
    intensivity: number;
}
export interface EmotionPickItemType extends EmotionJurnal {
    name: string
}

export interface JurnalRecordDistortionData {
    id: string,
    name: string
}
export interface JurnalRecordEmotionCardData {
    id: string,
    name: string,
    intensivity: number;
}
export interface JurnalRecordCardData {
    uid: string,
    situation: string,
    contestation: string,
    distortions: JurnalRecordDistortionData[],
    automaticThoughts: string; 
    emotions: JurnalRecordEmotionCardData[];  
    date: any | Date,
}

export interface JurnalRecordViewData extends JurnalRecord {
    destortionTitle: string[]
}

export interface JurnalRecordEditProps {
    // uid: string,
    situation: string,
    contestation: string,
    destortionUid: string[],
    automaticThoughts: string; 
    emotions: EmotionJurnal[];  
    userUid: string,
}

export interface JurnalRecordCreateProps { 
    situation: string,
    contestation: string,
    destortionUid: string[],
    automaticThoughts: string; 
    emotions: EmotionJurnal[];  
    // userUid: string,
    // date: any | Date,
}

export interface JurnalRecordFormData{
    situation: string,
    contestation: string,
    automaticThoughts: string; 
    // emotions: Emotion[];  
}
export type JurnalFieldType = keyof JurnalRecordFormData
export interface JurnalRecordFormErros {
    situation: string | null,
    contestation: string | null,
    automaticThoughts: string | null; 
    // emotions: Emotion[];  
}
