import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { DistortionType } from "../../../../navigation/types/navigation"
import { DestortionSelectorStyles } from './DestortionSelector.style';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from "react";
import { DistortionSelectorDescription } from "../DistortionSelectorDescriptionView/DistortionSelectorDescriptionView";

export interface DestortionSelectorProps {
    destortions: DistortionType[],
    onToggle: (uid: string) => void,
    selected: string[],
}
interface IdescriptionView {
    [id: string] : boolean
}
export const DestortionSelector = ({destortions,onToggle, selected} : DestortionSelectorProps) => {
    const[descriptionView,setDescriptionView] = useState<IdescriptionView>({})
    useEffect(() => {
        const init = destortions.reduce((acc,distortion) => {
            acc[distortion.id] = false
            return acc
        }, {} as IdescriptionView)
        setDescriptionView(init)
    }, [destortions])

    return(
        

        <View style={DestortionSelectorStyles.container}>
            <ScrollView>
                <Text style={DestortionSelectorStyles.title}>
                    Выберите искажения
                </Text>
                <View style={DestortionSelectorStyles.contentContainer}>
                     {
                        destortions.map(
                            destortion => (
                            <TouchableOpacity 
                                key={destortion.id}
                                onPress={() => onToggle(destortion.id)}
                                style={[
                                    DestortionSelectorStyles.item,
                                    selected.includes(destortion.id) && DestortionSelectorStyles.selectItem
                                ]}
                                >
                                <View style={DestortionSelectorStyles.headerBlock}>
                                    <Text style={
                                    [
                                        DestortionSelectorStyles.itemText,
                                        selected.includes(destortion.id) && DestortionSelectorStyles.selectItemText
                                    ]
                                    }>
                                        {destortion.name}
                                    </Text>
                                    <TouchableOpacity onPress={(e) => {
                                        e.stopPropagation()
                                        setDescriptionView(
                                            prev => ({
                                                ...prev,
                                                [destortion.id] : !prev[destortion.id]
                                            })
                                        )

                                    }}  style={[
                                        DestortionSelectorStyles.buttonDescription,
                                        selected.includes(destortion.id) && DestortionSelectorStyles.buttonDescriptionSelect 
                                    ]}>
                                        <Ionicons style={[
                                            DestortionSelectorStyles.itemIconStyle,
                                            selected.includes(destortion.id) && DestortionSelectorStyles.itemIconSelectStyle
                                        ]} name={
                                            descriptionView[destortion.id] ? 'chevron-up' : 'chevron-down'
                                        }/>
                                    </TouchableOpacity>
                                </View>
                                {
                                    descriptionView[destortion.id] && (
                                        <DistortionSelectorDescription distortion={destortion}/>
                                    )
                                }
                            </TouchableOpacity>
                            )
                        )
                    }
                </View>
               
            </ScrollView>
        </View>
    )
}