import React from "react";
import { 
  View, 
  Text, 
  Pressable, 
  Image, 
  SafeAreaView,
  Animated,
  Easing,
  ActivityIndicator
} from "react-native";
import { ColorTheme } from "../../style/Colors";
import { Ionicons } from '@expo/vector-icons';
import {AuthScreenStyles} from './AuthScreenStyle'  
import { useAuth } from "../../features/Auth/hooks/useAuthContext";
import { AuthScreenProps } from '../../navigation/types/navigation';

export const AuthScreen = ({navigation} : AuthScreenProps) => {
  function navigateToAuthEmail() {
    navigation.navigate('AuthEmailLogin', {type: 'login'})
    
  }
  const {loading} = useAuth()
  const scaleValue_1 = React.useRef(new Animated.Value(1)).current;
  const scaleValue_2 = React.useRef(new Animated.Value(1)).current;
  const animateButton = (scaleValue: any) => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.95,
        duration: 100,
        easing: Easing.ease,
        useNativeDriver: true
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        easing: Easing.elastic(1.5),
        useNativeDriver: true
      })
    ]).start();
  };
 
  if(loading){
    return(
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size='large' color={ColorTheme.main_color} />
      </View>
    )
  }
  return (
    <SafeAreaView style={AuthScreenStyles.container}>
      <View style={AuthScreenStyles.content}>
    
        <View style={AuthScreenStyles.circle1} />
        <View style={AuthScreenStyles.circle2} />
        
  
        <View style={AuthScreenStyles.logoContainer}>
          <Ionicons name="journal" size={80} color={ColorTheme.main_color} />
      
        </View>
        
      
        <View style={AuthScreenStyles.textContainer}>
          <Text style={AuthScreenStyles.title}>
            Дневник когнитивных искажений
          </Text>
          <Text style={AuthScreenStyles.subText}>
            Отслеживайте и анализируйте свои мыслительные шаблоны
          </Text>
        </View>
        
       <Animated.View style={[AuthScreenStyles.buttonContainer, {transform: [{scale: scaleValue_2}]}]}>
          <Pressable style={({pressed}) => [
            AuthScreenStyles.button_2,
            pressed && AuthScreenStyles.button_2_pressed
          ]} onPressIn={() => animateButton(scaleValue_2)}
          onPress={navigateToAuthEmail}>
            <Text style={AuthScreenStyles.buttonText_2}>
              Войти в аккаунт
            </Text>
          </Pressable>
       </Animated.View>
        <Animated.View style={[AuthScreenStyles.buttonContainer, { transform: [{ scale: scaleValue_1 }] }]}>
          <Pressable 
            style={({ pressed }) => [
              AuthScreenStyles.button,
              pressed && AuthScreenStyles.buttonPressed
            ]}
            onPressIn={() => animateButton(scaleValue_1)}
            onPress={() => console.log('google sigin')}
          >
            <View style={AuthScreenStyles.buttonContent}>
              <Image 
                source={require('../../../assets/google-logo.png')} 
                style={AuthScreenStyles.googleIcon} 
              />
              <Text style={AuthScreenStyles.buttonText}>
                Войти через Google
              </Text>
            </View>
          </Pressable>
        </Animated.View>
        
      
        <View style={AuthScreenStyles.footer}>
          <Text style={AuthScreenStyles.footerText}>
            Входя в приложение, вы соглашаетесь с нашими 
            <Text style={AuthScreenStyles.link}> Условиями использования </Text>
            и
            <Text style={AuthScreenStyles.link}> Политикой конфиденциальности</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
