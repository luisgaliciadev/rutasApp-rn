import React from 'react'
import { StyleProp, Text, ViewStyle, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'

interface Props {
    title: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

export const BlackButton = ( { title, onPress, style = {}}: Props) => {
    return (
        <TouchableOpacity
            onPress = {onPress}
            style = {{...sytles.button, ...style as any}}
            activeOpacity = {0.7}
        >
            <Text style={{...sytles.text}}>{title}</Text>
        </TouchableOpacity>
    )
}

const sytles = StyleSheet.create({
    button: {
        height: 50,
        width: 150,
        backgroundColor: 'black',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        elevation: 6
    },
    text: {
        color: 'white'
    }
});
