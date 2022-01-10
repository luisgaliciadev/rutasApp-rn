import React, { useEffect, useRef, useState } from 'react'

import MapView, { Marker, Polyline } from 'react-native-maps';
import { useLocation } from '../hooks/useLocation';
import { LoadingScreen } from '../screen/LoadingScreen';
import { Fab } from './Fab';

interface Props {
    markers?: Marker[];
}

export const Maps = ({markers}: Props) => {

    const [showPolyline, setShowPolyline] = useState<boolean>(false)
    const { hasLocation, initialPostion, getCurrentLocation, fallowUserLocation, userLocation, stopFallowUserLocation, routerLine} =  useLocation();
    const mapViewRef = useRef<MapView>();
    const fallowing = useRef<boolean>(true)

    useEffect(() => {
        fallowUserLocation();
        return () => {
            stopFallowUserLocation();
        }
    }, []);
    
    useEffect(() => {
        if (!fallowing.current) return;
        const { latitude, longitude} = userLocation;
        mapViewRef.current?.animateCamera({
            center: {
                latitude: latitude,
                longitude: longitude
            }
        });
    }, [userLocation]);

    const centerPosition = async () => {
        fallowing.current = true;
        const {latitude, longitude} = await getCurrentLocation();
        mapViewRef.current?.animateCamera({
            center: {
                latitude: latitude,
                longitude: longitude
            }
        });
    };

    if (!hasLocation) {
        return <LoadingScreen />
    }

    return (
        <>
            <MapView
                ref={(el) => mapViewRef.current = el!}
                style={{flex: 1}}
                initialRegion={{
                latitude: initialPostion!.latitude,
                longitude: initialPostion!.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                showsUserLocation
                onTouchMove={() => fallowing.current = false}
            >      
                {/* <Marker
                    image={require('../assest/img/custom-marker.png')}
                    coordinate={{
                        latitude: 37.78825,
                            longitude: -122.4324,
                    }}
                    title={'Esto es un marcador'}
                    description={'Esto es una descripción del marcado'}
                /> */}
                {
                    showPolyline && (
                        <Polyline
                            coordinates={routerLine}
                            strokeColor='black'
                            strokeWidth={10}
                        />
                    )
                }
            </MapView>

            <Fab 
                icoName="locate-outline" 
                onPress={centerPosition} 
                style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10
                }} 
            />

            <Fab 
                icoName="analytics-outline" 
                onPress={() => setShowPolyline(!showPolyline)} 
                style={{
                    position: 'absolute',
                    bottom: 70  ,
                    right: 10
                }} 
            />
        </>
    )
}
