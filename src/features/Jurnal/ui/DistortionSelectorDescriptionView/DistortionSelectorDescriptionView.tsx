import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { DistortionType } from "../../../../navigation/types/navigation";

interface DistortionSelectorDescriptionProps {
  distortion: DistortionType;
}

export const DistortionSelectorDescription: React.FC<DistortionSelectorDescriptionProps> = ({ distortion }) => {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Описание</Text>
        <Text style={styles.text}>{distortion.description}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Пример</Text>
        <Text style={styles.exampleText}>«{distortion.example}»</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Как справиться</Text>
        <Text style={styles.solutionText}>{distortion.solution}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3eeffff',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
    color: '#212529',
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    color: '#495057',
  },
  exampleText: {
    fontStyle: 'italic',
    fontSize: 14,
    lineHeight: 20,
    color: '#6c757d',
    backgroundColor: '#fffeeeff',
    padding: 12,
    borderRadius: 8,
  },
  solutionText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#2b8a3e',
    backgroundColor: '#d3f9d8',
    padding: 12,
    borderRadius: 8,
  },
});