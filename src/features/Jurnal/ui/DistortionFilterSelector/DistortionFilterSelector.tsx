import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ColorTheme } from "../../../../style/Colors"
import { DistortionType } from "../../../../navigation/types/navigation"
interface DistortionFilterSelectorProps {
    onToggle : (id: string) => void,
    selected: string | null,
    distortions: DistortionType[]
    
}
export const DistortionFilterSelector = ({onToggle,selected,distortions}: DistortionFilterSelectorProps ) => {
    return(
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>
                    Выберите искажение 
                </Text>
                {
                    distortions.map(
                        distortion => (
                            <TouchableOpacity
                                key={distortion.id}
                                onPress={() => onToggle(distortion.id)}
                                style={[
                                    styles.item,
                                    distortion.id === selected && styles.selectItem
                                ]}
                            >  
                            <Text>
                                {distortion.name}
                            </Text>
                            </TouchableOpacity>
                        )
                    )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
           height: 200,
           marginBottom:10,
           marginTop:20
           
        },
       title: {
          fontSize: 21,
          fontWeight: 'bold',
          color: ColorTheme.gray_dark,
          textAlign: 'center',
          marginBottom: 20,
       },
       item: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
      },
      selectItem: {
        backgroundColor: '#f5f0ff', 
        borderLeftWidth: 4,
        borderLeftColor: '#7748e5', 
      },
})