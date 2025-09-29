import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { JurnalRecordCardData } from '../../features/Jurnal/types/JurnalTypes';


export type RootAuthParamList = {
  Auth: undefined;
  AuthEmailLogin:  {type: 'register' | 'login'}
}

export type RootStackParamList = {
  AuthStack: undefined;
  MainTabs: undefined;
  AppStack: undefined;
  DistortionDetail: { distortion: DistortionType };
  RecordDetail: {record: JurnalRecordCardData, backScreen?: 'JurnalHistory' | 'MainTabs'}
  InfoScreen: undefined;
  JurnalFormCreate: {record?: JurnalRecordCardData,backScreen?: 'JurnalHistory' | 'MainTabs'},
  JurnalHistory: undefined
};

export type RootTabParamList = {
  DistortionList: undefined;
  DistortionJurnal: undefined;
  Profile: undefined
};

export type DistortionType = {
  id: string;
  name: string;
  description: string;
  example: string;
  solution: string;
};

export type JurnalHistoryScreenProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList, 'JurnalHistory'>,
  NativeStackScreenProps<RootStackParamList>
>


export type JurnalScreenProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'DistortionJurnal'>,
  NativeStackScreenProps<RootStackParamList>
>
export type RecordCreateFormProps = CompositeScreenProps<
  NativeStackScreenProps<RootStackParamList,'JurnalFormCreate'>,
  BottomTabScreenProps<RootTabParamList>
>


export type DistortionListTabProps = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, 'DistortionList'>,
  NativeStackScreenProps<RootStackParamList>
>;
export type RecordDetailProps = NativeStackScreenProps<RootStackParamList, 'RecordDetail'>
export type DistortionDetailProps = NativeStackScreenProps<RootStackParamList, 'DistortionDetail'>;
export type AuthScreenProps = NativeStackScreenProps<RootAuthParamList, 'Auth'>
export type AuthEmailLoginProps = NativeStackScreenProps<RootAuthParamList,'AuthEmailLogin'>
