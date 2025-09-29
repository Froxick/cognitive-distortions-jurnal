import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Headaer } from './src/components/Header';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './src/navigation/AppNavigation';
import { AuthProvider } from './src/features/Auth/hooks/useAuthContext';
import { JurnalProvider } from './src/features/Jurnal/hooks/useJurnalHook';
import { DistrotionProvider } from './src/features/destortion/hooks/destortionContext';



export default function App() {
  return (
    <>
      <AuthProvider>
        <DistrotionProvider>
            <JurnalProvider>
            <NavigationContainer>
              <AppNavigation />
          </NavigationContainer>
        </JurnalProvider>
        </DistrotionProvider>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
});
