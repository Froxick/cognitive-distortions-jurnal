import React from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native';
import { DistortionDetailProps } from '../navigation/types/navigation';
import { ColorTheme } from '../style/Colors';

export const DistortionDetailScreen: React.FC<DistortionDetailProps> = ({ route }) => {
 
  const { distortion } = route.params;
  
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{distortion.name}</Text>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Описание</Text>
          <Text style={styles.text}>{distortion.description}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Пример из жизни</Text>
          <Text style={styles.exampleText}>"{distortion.example}"</Text>
        </View>

        <View style={styles.solutionBox}>
          <Text style={styles.solutionTitle}>Как бороться:</Text>
          <Text style={styles.solutionText}>{distortion.solution}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  Button: {
    height: 50,
    width: 300,
    justifyContent: 'center',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: ColorTheme.main_color
  },
  container: {
    padding: 16,
    
    
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4f46e5',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: '#4b5563',
  },
  exampleText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#6b7280',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 6,
  },
  solutionBox: {
    backgroundColor: '#eef2ff',
    padding: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#4f46e5',
  },
  solutionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4338ca',
    marginBottom: 8,
  },
  solutionText: {
    fontSize: 16,
    color: '#4f46e5',
    lineHeight: 22,
  },
});