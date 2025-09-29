import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { DistortionDetailScreen } from "../screans/DistortionDetail";
import { RootAuthParamList, RootStackParamList, RootTabParamList } from "./types/navigation";
import { DistortionListScrean } from "../screans/DistortionList";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { ColorTheme } from "../style/Colors";


import { DestortionJurnalScreen } from "../screans/DestortionJurnal/DestortionJurnal";
import { AuthScreen } from "../screans/AuthScreen/AuthScreen";
import { useAuth } from "../features/Auth/hooks/useAuthContext";
import { ActivityIndicator, View } from "react-native";
import { AuthEmailSrceen } from "../screans/AuthEmailScreen/AuthEmailScreen";
import { ProfileScreen } from "../screans/ProfileScreen/ProfileScreen";
import { RecordForm } from "../features/Jurnal/components/RecordForm";
import { JurnalHistoryScreen } from "../features/Jurnal/screens/JurnalHistoryScreen/JurnalHistoryiScreen";
import { JurnalRecordsViewScreen } from "../features/Jurnal/screens/JurnalRecordViewScreen/JurnalRecordsViewScreen";
import { InfoScreen } from "../screans/info/InfoScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<RootTabParamList>()
const AuthStack = createNativeStackNavigator<RootAuthParamList>();
function TabNavigator() {
    return(
        <Tab.Navigator screenOptions={{
                tabBarActiveTintColor: ColorTheme.main_color, 
                tabBarInactiveTintColor: 'gray', 
                headerStyle: { backgroundColor: ColorTheme.main_color },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
      }}
        >
         
       <Tab.Screen 
        name="DistortionJurnal"
        component={DestortionJurnalScreen}
        options={{
          title: 'Дневник',
          headerShown: false,
          tabBarIcon: ({color,size}) => (
            <Ionicons name='journal' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="DistortionList"
        component={DistortionListScrean}
        options={{
          title: 'Список искажений',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name='Profile'
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Профиль',
          tabBarIcon : ({color, size}) => (
            <Ionicons name='man-outline' color={color} size={size}/>
          )
        }}
      />
    
        </Tab.Navigator>
    )
}
function AuthNavigator() {
  return(
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name='Auth' component={AuthScreen} />
      <AuthStack.Screen name='AuthEmailLogin' component={AuthEmailSrceen}  />
    </AuthStack.Navigator>
  )
}
function AppStack() {
  return(
    <Stack.Navigator 
            screenOptions={{
                headerStyle: { backgroundColor: ColorTheme.main_color },
                headerTintColor: 'white',
                headerTitleAlign: 'center'
            }}
        >
              <Stack.Screen
                name="MainTabs"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen 
              name='InfoScreen'
              component={InfoScreen}
              options={{title: 'Информация', headerShown: false}}
            />
            <Stack.Screen 
                name="DistortionDetail" 
                component={DistortionDetailScreen} 
                options={{ title: 'Описание' }}
            />
            <Stack.Screen 
              name='RecordDetail'
              component={JurnalRecordsViewScreen}
              options={{title: '', headerShown: false}}
            />
            <Stack.Screen
              name="JurnalFormCreate"
              component={RecordForm}
              options={{title: 'Форма', headerShown: false}}
            />
            <Stack.Screen
              name='JurnalHistory'
              component={JurnalHistoryScreen}
              options={{title:"История", headerShown: false}}
            />
        </Stack.Navigator>
  )
}
export default function AppNavigation(){
  const {user,loading,initialized} = useAuth()
    if(!initialized) {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size='large' color={ColorTheme.main_color}/>
        </View>
      )
    }
    return(
        <Stack.Navigator screenOptions={{headerShown: false}} >
          {
           user ? (
          <Stack.Screen name='AppStack' component={AppStack} />
        ) : (
          <Stack.Screen name='AuthStack' component={AuthNavigator} />
        )
          }
        </Stack.Navigator>
      )
  }

