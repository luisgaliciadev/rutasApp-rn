import React, { useContext } from 'react'
import { Button, StyleSheet, Text, View } from 'react-native';
import { PermissionsContext } from '../context/PermissionsContext';
import { BlackButton } from '../components/BlackButton';

export const PermissionsScreen = () => {

    const { permissions, askLocationPermission } = useContext(PermissionsContext)

   
    return (
        <View style={{...styles.container}}>
            <Text style={{...styles.textContainer}}>Para usar la App es necesario el uso del GPS y tener permiso para acceder a tu ubicación</Text>

            <BlackButton 
                title="Solicitar Permiso"
                onPress={askLocationPermission}
            />
    
            <Text>{JSON.stringify(permissions, null, 5)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textContainer: {
        fontSize: 20,
        fontWeight: 'bold'
    }

});
