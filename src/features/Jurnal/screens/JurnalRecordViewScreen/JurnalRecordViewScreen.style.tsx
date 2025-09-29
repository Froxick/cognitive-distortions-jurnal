import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";

export const JurnalRecordViewScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        
    },
    circleBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        overflow: 'hidden'
    },
    circleTop: {
        position: 'absolute',
        top: 200,
        left: -50,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: ColorTheme.main_color, 
        opacity: 0.1
    },
    circleSmall :{
        position: 'absolute',
        top: 200,
        left: 320,
        width: 150,
        height: 150,
        borderRadius: 150,
        backgroundColor: ColorTheme.main_color, 
        opacity: 0.1
    }, 
    circleBottom: {
        position: 'absolute',
        bottom: -150,
        right: -100,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: ColorTheme.main_color, 
        opacity: 0.1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: ColorTheme.gray_light
    },
    backButton: {
        padding: 8
    },
    
    headerTitle: {
        fontSize: 21,
        fontWeight: 'bold',
        color: ColorTheme.text_main
    },
    headerActions: {
        flexDirection: 'row',
        gap: 16
    },
    actionButton: {
        padding: 8
    },
    deleteButton: {
        marginLeft: 8
    },
    content: {
        flex: 1,
        padding: 16,
        borderTopColor: '#dadadaff',
        borderTopWidth: 1,
        paddingTop: 40,
    },
    metaContainer: {
        marginBottom: 24
    },
    dateContainer: {
        flexDirection: 'row',
        alignContent:'center',
        alignItems:'center',
         marginBottom: 12,
         gap: 10
    },
    date: {
        fontSize: 18,
        color: ColorTheme.gray_dark,
        fontWeight: 'bold'
       
    },
    dateIcon: {
        fontSize: 19,
        color: ColorTheme.gray_dark
    },
    distortionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8
    },
    distortionBadge: {
        backgroundColor: ColorTheme.main_color,
        borderRadius: 16,
        paddingVertical: 4,
        paddingHorizontal: 12
    },
    distortionText: {
        color: 'white',
        fontSize: 14,
        padding: 5
    },
    section: {
        marginBottom: 24,
        backgroundColor:'white',
        borderRadius: 10,
        padding: 15,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
    },
    sectionTitleBorderItem: {
        borderLeftColor: ColorTheme.main_color,
        borderLeftWidth: 3.5,
        paddingLeft: 8,
        textAlign:'center',
        alignContent:'center',
        justifyContent:'center',
        marginBottom: 18
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c2c2cff',
       
        
    },
    sectionContent: {
        fontSize: 16,
        color: ColorTheme.gray_dark,
        minHeight: 70,
        lineHeight: 24,
        paddingLeft: 20
    },
    emotionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    emotionBadge: {
        backgroundColor: ColorTheme.main_color,
        borderRadius: 16,
        paddingVertical: 6,
        paddingHorizontal: 12,
        flexDirection: 'row',
        gap: 12,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emotionText: {
        color: 'white',
        fontSize: 14,
        paddingLeft: 8
    },
    emotionTextIntensivity: {
        color: 'white',
        
        
    },
    emotionTextIntensivityContainer: {
        backgroundColor: '#815ffcff',
        borderRadius: '100%',
        height: 30,
        width: 30,
        padding:5,
        alignContent:'center',
        justifyContent:'center',
        textAlign:'center',
        alignItems: 'center'
    }
})