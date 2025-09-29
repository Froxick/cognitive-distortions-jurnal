import { ReactNode } from "react"
import { Modal, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { DestortionJurnalStyles } from "../../../../screans/DestortionJurnal/DestortionJurnalStyle";
import { DestortionModalWindowStyles } from "./DestortionModalWindow.style";

interface DestortionModalWindowProps {
    onClose: () => void,
    visible: boolean,
    children: ReactNode,
    viewButton: boolean
}
const styles = DestortionModalWindowStyles
export const DestortionModalWindow = ({onClose,visible,children,viewButton} : DestortionModalWindowProps) => {
    return(
        <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }} />
        </TouchableWithoutFeedback>
        
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
          
          {children}
          

          {
            viewButton && (
               <TouchableOpacity 
                  style={styles.doneButton} 
                  onPress={onClose}
                >
                  <Text style={styles.doneButtonText}>Готово</Text>
                </TouchableOpacity>
            )
          }
         
        </View>
      </View>
    </Modal>
    )
}