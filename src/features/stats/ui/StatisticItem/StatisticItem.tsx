import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { ColorTheme } from "../../../../style/Colors";
import { IStaticItem } from "../../../../screans/ProfileScreen/ProfileScreen";




export const StatisticItem = ({ title, value, icon }: IStaticItem) => (
    <View style={styles.container}>
        <View style={styles.iconContainer}>
            <Ionicons name={icon} size={24} color={ColorTheme.main_color} />
        </View>
        <Text style={styles.value}>{value}</Text>
        <Text style={styles.title}>{title}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '48%',
        backgroundColor: '#ece9f6ff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: '#ece9f6ff',
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    value: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#4b4b4bff',
        marginBottom: 4,
    },
    title: {
        fontSize: 14,
        color: 'grey',
        textAlign: 'center',
    },
});