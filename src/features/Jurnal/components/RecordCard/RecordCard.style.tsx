import { StyleSheet } from "react-native";
import { ColorTheme } from "../../../../style/Colors";

export const RecordCardStyle = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        width: 320, 
        borderLeftWidth: 4,
        borderLeftColor: ColorTheme.main_light,
        overflow: 'hidden',
        position:'relative'
    },
    
    content: {
        flex: 1,
       
    },
    expandButton: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        zIndex: 10,
        backgroundColor: 'rgba(255,255,255,0.7)',
        borderRadius: 15,
        padding: 4,
    },
    pressed: {
        transform: [{ scale: 0.98 }],
        backgroundColor: '#faf9ff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    dateText: {
        color: ColorTheme.gray_dark,
        fontSize: 14,
        fontWeight: '500',
    },
    distortionBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: ColorTheme.main_color,
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
    },
    distortionCount: {
        color: 'white',
        fontSize: 13,
        fontWeight: '600',
        marginLeft: 4,
    },
    situationText: {
        color: ColorTheme.gray_dark,
        fontSize: 16,
        lineHeight: 20,
        marginBottom: 12,
        minHeight: 24, 
    },
    thoughtsText: {
        color: ColorTheme.gray_dark,
        fontSize: 14,
        lineHeight: 18,
        flex: 1,
        minHeight: 20, 
        marginBottom: 12,
    },
    expandedText: {
        minHeight: 'auto',
    },
    thoughtsIcon: {
        marginRight: 6,
        marginTop: 2,
        
        
    },
    thoughtsContainer: {
        flexDirection: 'row',
        gap: 3
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    footerText: {
        color: ColorTheme.gray_medium,
        fontWeight: 'bold',
        marginLeft: 10
    },
    distortionPill: {
        backgroundColor: '#f0e9ff',
        borderRadius: 12,
        paddingVertical: 6,
        paddingHorizontal: 12,
        maxWidth: '70%',
    },
    distortionText: {
        color: ColorTheme.main_color,
        fontSize: 14,
        fontWeight: '500',
    },
    
});