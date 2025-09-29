import { View, Text, StyleSheet } from "react-native"

interface HeaderProps {
    title : string,
    size: number,
    color: string,
    desc?: string,
    descSize? : number
}

export const Headaer = ({title,color,size,desc,descSize} : HeaderProps) => {
    const headerStyle = StyleSheet.create({
    header: {
       
   
       
        
    },
    title : {
        color: color,
        fontSize: size,
        fontWeight: 'bold'
    },
    desc: {
        fontSize: descSize,
        marginTop: 5,
        color: '#919191',
        width: 220
    }
})
    return (
        <View style={headerStyle.header}>
            <Text style={headerStyle.title}>
                {title}
            </Text>
            <Text style={headerStyle.desc}>
                {desc}
            </Text>
        </View>
    )
}
