import { StyleSheet, Dimensions } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { ColorTheme } from "../../../../style/Colors";


const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 32;

export const JurnalHistoryStyles = StyleSheet.create({
   mainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
       
    },
    headerContainer: {
        marginTop: 50,
        padding: 16,
        width: '100%',
        zIndex: 1,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        justifyContent: 'center',
    },
    screenTitle: {
        fontSize: 29,
        fontWeight: 'bold',
        color: ColorTheme.main_color,
    },
    contentContainer: {
        flex: 1,
        width: '93%',
        backgroundColor: '#f6f3fbff',
         shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
        borderRadius: 10
    },
    listStyle: {
        flex: 1,
    },
    listContent: {
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 32,
        
        
    },
    filtersContainer: {
        backgroundColor: 'white',
        marginTop: 30,
        borderRadius: 10,
        height: 70,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
        justifyContent: 'space-between',
        flexDirection: 'row',
       
    },
    cardItem: {
        marginBottom: 16,
        borderRadius: 12,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    sectionHeader: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        marginTop: 16,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: ColorTheme.main_color,
        // backgroundColor: '#e6d8ffff',
        // borderTopRightRadius: 10,
        // borderBottomRightRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.1,
        // shadowRadius: 4,
        // elevation: 2,
    },
    sectionHeaderText: {
        fontSize: 18,
        fontWeight: '600',
        color: ColorTheme.main_color,
    },
    footerLoader: {
        paddingVertical: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
    },
    emptyText: {
        fontSize: 18,
        color: ColorTheme.gray_dark,
        marginTop: 20,
        textAlign: 'center',
    },
    distortionFilterContainer: {
        justifyContent:'center',
        alignContent:'center',
        textAlign:'center',
       
        minWidth: 140,
        maxWidth: 180,
        alignItems:'center',
        padding: 10,
        borderRadius: 10,
        marginLeft: 10,
    },
    distortionFilterText: {
        
    },
    filterClearButton: {
        borderRadius: "100%",
        backgroundColor: '#f7a5a5ff',
        width: 30,
        height: 30,
        padding: 5,
        alignContent: 'center',
        alignItems: 'center',
        textAlign:'center',
        justifyContent: 'center'
    },
    filterClearIcon: {
        fontSize: 20
    },
    distortionFilterFlex : {
        gap: 10,
        alignItems:'center',
        flexDirection: 'row'
        
    },
    dateFilterFlex: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 20,
        gap: 10
    },
    dateFilterContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 20,
    },
    dateFilterText: {
        marginLeft: 5,
        fontSize: 14,
    },
});