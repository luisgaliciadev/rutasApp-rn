import React from 'react';
import { Text, View } from 'react-native';
import { Maps } from '../components/Maps';

export const MapScreen = () => {
    return (
        <View style={{flex: 1}}>
            {/* <Text>Map Screen</Text> */}
            <Maps/>
        </View>
    )
}
