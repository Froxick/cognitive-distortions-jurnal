import { LayoutAnimation, Pressable, Text, View } from "react-native"
import { JurnalRecordCardData } from "../../types/JurnalTypes"
import { RecordCardStyle } from "./RecordCard.style"
import { formatDate, formatDateShort } from "../../../../utils/DateHelpers/DateHelper"
import { Ionicons } from '@expo/vector-icons';
import { ColorTheme } from "../../../../style/Colors";
import { useState } from "react";

interface RecordCardProps {
    record: JurnalRecordCardData,
    filterDistortionUid?: string,
    onPress: () => void,
}
interface RecordCardProps {
    record: JurnalRecordCardData,
    filterDistortionUid?: string,
    onPress: () => void,
}
export const RecordCard = ({ record, onPress, filterDistortionUid }: RecordCardProps) => {
    const [expanded, setExpanded] = useState(false);
    const formattedDate = formatDateShort(record.date);
    const distortionCount = record.distortions.length;
    const filterDistortion = record.distortions.filter(el => el.id === filterDistortionUid)[0];
    const mainDistortion = filterDistortionUid != undefined ? 
        (distortionCount > 0 ? filterDistortion : null) : 
        (distortionCount > 0 ? record.distortions[0] : null);
        
    const toggleExpand = (e: any) => {
        e.stopPropagation();
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpanded(!expanded);
    };
    
    const handleMainPress = () => {
        onPress();
    };
    
    return (
        <Pressable 
            style={({ pressed }) => [
                RecordCardStyle.container,
                pressed && RecordCardStyle.pressed
            ]} 
            onPress={handleMainPress}
        >
            
            <View style={RecordCardStyle.content}>
                <View style={RecordCardStyle.header}>
                    <Text style={RecordCardStyle.dateText}>
                        {formattedDate}
                    </Text>
                    
                    {distortionCount > 0 && (
                        <View style={RecordCardStyle.distortionBadge}>
                            <Ionicons 
                                name="color-filter" 
                                size={14} 
                                color="white" 
                            />
                            <Text style={RecordCardStyle.distortionCount}>
                                {distortionCount}
                            </Text>
                        </View>
                    )}
                </View>
                
                <Text 
                    style={[
                        RecordCardStyle.situationText,
                        expanded && RecordCardStyle.expandedText
                    ]} 
                    numberOfLines={expanded ? undefined : 3}
                >
                    {record.situation}
                </Text>
                
                {record.automaticThoughts && (
                    <View style={RecordCardStyle.thoughtsContainer}>
                         <Ionicons 
                            name="chatbubble-ellipses" 
                            size={14} 
                            color={ColorTheme.gray_medium} 
                            style={RecordCardStyle.thoughtsIcon}
                        />
                    <Text 
                        style={[
                            RecordCardStyle.thoughtsText,
                            expanded && RecordCardStyle.expandedText
                        ]}
                        numberOfLines={expanded ? undefined : 2}
                    >
                       
                        {record.automaticThoughts}
                    </Text>
                    </View>
                    
                )}
                
                {mainDistortion && (
                    <View style={RecordCardStyle.footer}>
                        <View style={RecordCardStyle.distortionPill}>
                            <Text style={RecordCardStyle.distortionText} numberOfLines={1}>
                                {mainDistortion.name}
                            </Text>
                        </View>
                        <Text style={RecordCardStyle.footerText}>
                            {distortionCount > 1 && `Еще +${distortionCount - 1}`}
                        </Text>
                    </View>
                )}
            </View>
            
          
            <Pressable 
                onPress={toggleExpand} 
                style={RecordCardStyle.expandButton}
                hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}
            >
                <Ionicons 
                    name={expanded ? "chevron-up" : "chevron-down"} 
                    size={20} 
                    color={ColorTheme.gray_medium} 
                />
            </Pressable>
        </Pressable>
    );
}