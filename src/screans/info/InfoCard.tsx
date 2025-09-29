import { StyleSheet, Text, View } from "react-native"

interface InfoCardProps {
    title: string,
    desc: string
}
export const InfoCard = ({title,desc} : InfoCardProps) => {
    return(
         <View style={styles.example}>
        
            <Text style={styles.exampleTitle}>{title}</Text>
            <Text style={styles.exampleText}>
                    {desc}
            </Text>
         </View>
    )
}
const styles = StyleSheet.create({
    example: {
    backgroundColor: '#f0e5ff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
  },
  exampleTitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#5d34a9',
    marginBottom: 5,
  },
  exampleText: {
    fontSize: 15,
    color: '#555',
  },
})