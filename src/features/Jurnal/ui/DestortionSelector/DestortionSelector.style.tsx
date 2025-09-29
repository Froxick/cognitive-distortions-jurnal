import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";

export const DestortionSelectorStyles = StyleSheet.create({
    container: {
       height: 300,
       marginBottom:10,
       
       marginTop:20
       
    },
    contentContainer: {
      gap: 10,
      paddingBottom: 30
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
    backgroundColor: '#dedaf5ff',
    borderRadius: 10,
    shadowColor: '#050505ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    
   
  },
  headerBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  selectItem: {
    backgroundColor: '#816cf9ff',
    
  },
  itemText: {
    fontSize: 14,
    fontWeight: 'bold'
  },
  selectItemText: {
    color: 'white'
  },
  itemIconStyle: {
    fontSize: 18
  },
  itemIconSelectStyle: {
    color: 'white',
    textAlign: 'center'
  },
  buttonDescription: {
     padding: 5,
     alignContent:'center',
     justifyContent: 'center',
     alignItems: 'center',
     textAlign: 'center',
     backgroundColor: '#c6c0ffff',
     borderRadius: '100%'
  },
  buttonDescriptionSelect: {
    backgroundColor: '#968bffff',
  }
})

