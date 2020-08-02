import React, { useState, useEffect } from 'react';
import { View , StyleSheet} from 'react-native';
import MapView,  { PROVIDER_GOOGLE } from 'react-native-maps'

import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


import CustomButton from '../../components/CustomButton';
import HeatMap from './HeatMap';
import Colors from '../../constants/colors';

const MapExtension = props => {

    const [locationPermission, setLocationPermission] = useState(null);

    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');

    const [region, setRegion] = useState({
        latitude: 38.726608,
        longitude: -9.1405415,
        latitudeDelta: 0.0522,
        longitudeDelta: 0.0521,
    });

     // Get geolocation when component is used
     useEffect(() => {
        (async () => {
            const permissions = await Permissions.askAsync(Permissions.LOCATION);
            setLocationPermission(permissions.permissions.location.status);
        })();
      
    }, []);
    

    const RegionChangeHandler = props => {
        setRegion(props);
        // prints new region dragged by user
        //console.log(region);
    }

    return (
        <View style={styles.map}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={RegionChangeHandler}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass= {true}
            rotateEnabled={true}>
            <HeatMap></HeatMap>
            </MapView>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
export default MapExtension;