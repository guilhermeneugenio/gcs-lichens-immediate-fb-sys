import React, { useState, useEffect } from 'react';
import { View , StyleSheet} from 'react-native';
import MapView,  {Heatmap, PROVIDER_GOOGLE } from 'react-native-maps'

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
    
    // Get geolocation
      getLocationAsync = async () => {
        // Gets permissions
        
        if (locationPermission !== 'granted') {    
             
            setErrorMessage('Permission to access location was denied');
            console.log(errorMessage);
        }
        else {
            // Gets coordinates   
            await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })
            .then((data) => {
                setRegion({
                    latitude: data.coords.latitude,
                    longitude: data.coords.longitude,
                    latitudeDelta: 0.0018,
                    longitudeDelta: 0.0018,
                });
            });      
        }
    };

    const RegionChangeHandler = props => {
        setRegion(props);
        console.log(region);
    }

    return (
        <View style={styles.map}>
            <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={region}
            onRegionChangeComplete={RegionChangeHandler}
        
            showsMyLocationButton={true}
            showsCompass= {true}
            rotateEnabled={true}>

            <HeatMap></HeatMap>
            
            </MapView>

            
          
            <CustomButton
                backgroundColor={Colors.secondary}
                textColor={Colors.primary}
                onPress={getLocationAsync}
                style={{position: 'absolute', bottom: 50, marginLeft:100} }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
  });
export default MapExtension;