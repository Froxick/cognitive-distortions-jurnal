// import { StyleSheet } from "react-native";

import { StyleSheet } from "react-native";
import { ColorTheme } from "../../style/Colors";

// import { ColorTheme } from "../../style/Colors";
export const ProfileScreenStyles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    infoContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        textAlign: 'center'
    },
    infoContainerText: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems:'center',
        textAlign: 'center'
    } ,
    infoContainerTextName: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#363636ff'
    },
    infoContainerTextEmail: {
         fontSize: 16,
         color: 'grey',
    },
    infoContainerImageView: {
        width: 150,
        height: 150,
        backgroundColor:'#ffffffff',
        borderRadius: 1000,
        marginTop: '25%',
        marginBottom: '3%',
        justifyContent: 'center',
        textAlign: 'center',
        alignItems: 'center',
        alignContent: 'center',
         shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
    },
    statisticContainer: {
        marginTop: 40,
        width: 360,
        marginHorizontal: 10,
        height: 'auto',
        paddingBottom: 15,
        backgroundColor: '#ffffffff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 5, 
        flexDirection: 'column',
        marginBottom: '10%'
    },
    statisticContainerTitleView: {
        padding: 20
    },
    statisticContainerTitleText: {
        fontSize: 20,
        fontWeight: '600',
        color: 'grey',
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    statisticContainerContentView: {
        paddingHorizontal: 20,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    leaveButtonContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
        logoutButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f9bcbcff',
        borderRadius: 12,
        paddingVertical: 18,
        paddingHorizontal: 20,
        marginTop: 10,
        marginBottom: 40,
        width:350
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: '500',
        color: ColorTheme.error,
        paddingHorizontal: 10
    },
})

// export const ProfileScreenStyles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#f9f9f9',
//         padding: 20,
//     },
//     header: {
//         alignItems: 'center',
//         marginBottom: 30,
//         paddingTop: 20,
//     },
//     avatarContainer: {
//         position: 'relative',
//         marginBottom: 15,
//     },
//     avatar: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//         borderWidth: 3,
//         borderColor: 'grey',
//     },
//     editAvatarButton: {
//         position: 'absolute',
//         bottom: 5,
//         right: 5,
//         backgroundColor: ColorTheme.main_color,
//         borderRadius: 20,
//         width: 40,
//         height: 40,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     name: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         color: 'grey',
//         marginBottom: 5,
//     },
//     email: {
//         fontSize: 16,
//         color: 'grey',
//     },
//     section: {
//         marginBottom: 30,
//         backgroundColor: 'white',
//         borderRadius: 15,
//         padding: 20,
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.1,
//         shadowRadius: 6,
//         elevation: 3,
//     },
//     sectionTitle: {
//         fontSize: 20,
//         fontWeight: '600',
//         color: 'grey',
//         marginBottom: 15,
//         paddingBottom: 10,
//         borderBottomWidth: 1,
//         borderBottomColor: '#eee',
//     },
//     statsContainer: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        // justifyContent: 'space-between',
//     },
//     achievementsContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         marginTop: 10,
//     },
//     achievement: {
//         alignItems: 'center',
//         padding: 10,
//     },
//     achievementText: {
//         marginTop: 8,
//         fontSize: 12,
//         color: 'grey',
//         textAlign: 'center',
//     },
    // logoutButton: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    //     backgroundColor: '#ffeaea',
    //     borderRadius: 12,
    //     paddingVertical: 18,
    //     paddingHorizontal: 20,
    //     marginTop: 10,
    //     marginBottom: 40,
    // },
    // logoutButtonText: {
    //     fontSize: 18,
    //     fontWeight: '500',
    //     color: ColorTheme.error,
    // },
// });