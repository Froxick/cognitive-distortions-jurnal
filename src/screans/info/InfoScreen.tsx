import { Image } from "expo-image";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ColorTheme } from "../../style/Colors";
import { InfoCard } from "./InfoCard";


export const InfoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
    
        <View>
          <Text style={styles.headerTitle}>О когнитивных искажениях</Text>
          <Text style={styles.subtitle}>
            Понимание механизмов мышления для более осознанной жизни
          </Text>
        </View>
        
       
        <View 
          style={styles.card}
         
        >
          <Text style={styles.cardTitle}>Что это такое?</Text>
          <Text style={styles.cardText}>
            Когнитивные искажения - это систематические ошибки в мышлении, которые возникают 
            при обработке информации. Они искажают наше восприятие реальности и часто приводят 
            к неадаптивным эмоциям и поведению.
          </Text>
          
          <View style={styles.exampleContainer}>
            <View style={styles.exaple_text_view}>
                <Text style={styles.example_text}>
                    Примеры:
                </Text>
            </View>
            <InfoCard title="Катастрофизация" desc="Преувеличение негативных последствий событий"/>
            <InfoCard title="Чтение мыслей" desc=" Уверенность, что вы знаете мысли других без оснований"/>
            <InfoCard title="Чёрно-белое мышление" desc="Восприятие ситуации только в крайностях"/>
          </View>
        </View>
        
        <View 
          style={styles.card}
          
        >
          <Text style={styles.cardTitle}>Как использовать дневник</Text>
          
          <View style={styles.step}>

            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>1. Запись ситуации</Text>
              <Text style={styles.stepDescription}>
                Опишите событие, вызвавшее сильные эмоции
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
       
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>2. Анализ мыслей</Text>
              <Text style={styles.stepDescription}>
                Определите автоматические мысли и чувства
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
    
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>3. Выявление искажений</Text>
              <Text style={styles.stepDescription}>
                Найдите когнитивные искажения в ваших мыслях
              </Text>
            </View>
          </View>
          
          <View style={styles.step}>
         
            <View style={styles.stepTextContainer}>
              <Text style={styles.stepTitle}>4. Формулировка альтернатив</Text>
              <Text style={styles.stepDescription}>
                Создайте более сбалансированный взгляд на ситуацию
              </Text>
            </View>
          </View>
        </View>
        
     
        <View 
          style={styles.card}
          
        >
          <Text style={styles.cardTitle}>Почему это важно?</Text>
          <Text style={styles.cardText}>
            Работа с когнитивными искажениями помогает:
          </Text>
          
          <View style={styles.benefitList}>
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>Снизить тревожность и стресс</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>Улучшить отношения с окружающими</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>Принимать более взвешенные решения</Text>
            </View>
            
            <View style={styles.benefitItem}>
              <Text style={styles.benefitIcon}>✓</Text>
              <Text style={styles.benefitText}>Развивать эмоциональную устойчивость</Text>
            </View>
          </View>
          
          
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  example_text: {
    color: '#5d34a9',
    fontSize: 22,
    fontWeight: 'bold'
  },
  exaple_text_view: {
    marginBottom: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f5ff',
  },
  scrollContainer: {
    padding: 20,
    paddingBottom: 40,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#5d34a9',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#7a6f8d',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#5d34a9',
    marginBottom: 15,
  },
  cardText: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginBottom: 15,
  },
  exampleContainer: {
    marginTop: 15,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5d34a9',
    marginBottom: 3,
  },
  stepDescription: {
    fontSize: 15,
    color: '#555',
  },
  benefitList: {
    marginTop: 10,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitIcon: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5d34a9',
    marginRight: 10,
  },
  benefitText: {
    fontSize: 16,
    color: '#555',
    flex: 1,
  },

});