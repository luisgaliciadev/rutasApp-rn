import React from 'react'
import { View, StyleProp, ViewStyle, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


interface Props {
    icoName: string;
    onPress: () => void;
    style?: StyleProp<ViewStyle>
}

export const Fab = ({icoName, onPress, style = {}}: Props) => {
    return (
        <View style={{...style as any}}>

            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onPress}
                style={styles.blackButton}
            >
            <Icon
                name={icoName}
                color="white"
                size={35}
            />
            </TouchableOpacity>
            
        </View>
    )
}

const styles = StyleSheet.create({
    blackButton: {
        zIndex: 999,
        height: 50,
        width: 50,
        backgroundColor: "grey",
        borderRadius: 100,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: 6
    }

})