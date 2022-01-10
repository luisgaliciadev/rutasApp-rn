import { useEffect, useRef, useState } from "react";
import Geolocation from "@react-native-community/geolocation";
import { Location } from "../interfaces/appInterfaces";

export const useLocation = () => {
    const [hasLocation, setHasLocation] = useState(false);
    const [routerLine, setRouterLine] = useState<Location[]>([])
    const [initialPostion, setInitialPostion] = useState<Location>({
       longitude: 0,
       latitude: 0
    });
    const [userLocation, setUserLocation] = useState<Location>({
        longitude: 0,
        latitude: 0
    });
    const watchId = useRef<number>();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        }

    }, []);

    useEffect(() => {
        getCurrentLocation()
            .then( location => {

                if (!isMounted.current) return;

                setInitialPostion(location);
                setUserLocation(location);
                setRouterLine(routes => [...routes, location]);
                setHasLocation(true);
            });
    }, []);

    const getCurrentLocation = (): Promise<Location> => {
        return new Promise((resolve, reject) => {
            Geolocation.getCurrentPosition(
                ({coords}) => {
                    resolve({
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    })
                }, // OK
                error => reject(error), // Error
                { 
                    enableHighAccuracy: true, 
                    timeout: 20000, 
                    maximumAge: 1000 
                }
            );
        });
    }
    
    const fallowUserLocation = () => {
        watchId.current =  Geolocation.watchPosition(
            ({coords}) => {
                if (!isMounted.current) return;

                const location: Location = {
                    latitude: coords.latitude,
                    longitude: coords.longitude
                }
            
                setUserLocation(location);
                setRouterLine(routes => [...routes, location]);
            }, // OK
            error => console.log(error), // Error
            { 
                enableHighAccuracy: true, 
                timeout: 20000, 
                maximumAge: 1000,
                distanceFilter: 10
            }
        );     
    }

    const stopFallowUserLocation = () => {
        if (watchId.current) {
            Geolocation.clearWatch(watchId.current);
        }
    }

    return {
        hasLocation,
        initialPostion,
        getCurrentLocation,
        fallowUserLocation,
        userLocation,
        stopFallowUserLocation,
        routerLine
    }
    
}
