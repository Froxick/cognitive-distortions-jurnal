import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native"
import { DeleteConfirmStyles } from "./DeleteConfirm.style"
import { ColorTheme } from "../../../../style/Colors"
interface DeleteConfirmProps {
    onCancel: () => void,
    onAccept: () => void, 
    loading: boolean
}
const styles = DeleteConfirmStyles
export const DeleteConfirm = ({onCancel,onAccept,loading} : DeleteConfirmProps ) => {
  
    return(
        <View style={styles.container}>
            {
                loading ? (
                    <ActivityIndicator size={'large'}/>
                ) : ( 
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>
                                Удалить запись?
                            </Text>
                        </View>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={onAccept} style={styles.acceptButton}>
                                <Text style={{
                                    color: '#be2525ff'
                                }}>
                                    Удалить
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
                                <Text>
                                    Отмена
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }
        </View>
    )
}