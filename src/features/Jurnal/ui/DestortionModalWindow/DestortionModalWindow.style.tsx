import { Dimensions, StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";
const windowHeight = Dimensions.get('window').height;
export const DestortionModalWindowStyles = StyleSheet.create({
   modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    width: '90%',
    maxHeight: windowHeight * 0.8,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  doneButton: {
    backgroundColor: ColorTheme.main_color,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  doneButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
})