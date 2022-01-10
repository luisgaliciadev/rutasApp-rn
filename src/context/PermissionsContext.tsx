import React, { useEffect } from 'react';

import { createContext, useState } from 'react';
import { AppState, Platform } from 'react-native';
import { PERMISSIONS, PermissionStatus, request, check, openSettings } from 'react-native-permissions';

export interface PermissionsState {
    localitacionStatus: PermissionStatus
}

export const permissionsInitState: PermissionsState = {
    localitacionStatus: 'unavailable'
}

type PermissionsContextProps = {
    permissions: PermissionsState;
    askLocationPermission: () => void;
    checkLocationPermission: () => void;
}

export const PermissionsContext =  createContext({} as PermissionsContextProps); 

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState(permissionsInitState);

    const askLocationPermission = async () => {
        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        if (permissionStatus === 'blocked') {
            openSettings();
        }
        console.log('permissionStatus:', permissionStatus);
        setPermissions({
            ...permissions,
            localitacionStatus: permissionStatus
        });
    };

    const checkLocationPermission = async () => {

        let permissionStatus: PermissionStatus;
        if (Platform.OS === 'ios') {
            permissionStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        } else {
            permissionStatus = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        }
        console.log('permissionStatus:', permissionStatus);
        setPermissions({
            ...permissions,
            localitacionStatus: permissionStatus
        });

    };

    useEffect(() => {
        checkLocationPermission();
        
        AppState.addEventListener('change', state => {
           console.log('state', state);
           if (state !== 'active') {
               return;
           }

           checkLocationPermission();
       });

       return
    }, [])

    return (
        <PermissionsContext.Provider value={{
            permissions,
            askLocationPermission, 
            checkLocationPermission
        }}>
            { children }
        </PermissionsContext.Provider>
    )
}