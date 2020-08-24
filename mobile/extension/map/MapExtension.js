import React, { useState, useEffect } from 'react';
import { View , StyleSheet, TouchableOpacity, Text} from 'react-native';
import MapView,  { PROVIDER_GOOGLE } from 'react-native-maps'

import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons';
import  Heatmap from './HeatMap';
import Colors from '../../constants/colors';
import config from '../config';

const MapExtension = props => {

    const [locationPermission, setLocationPermission] = useState(null);

    const [metric, setMetric] = useState('Aridity');
    
    const [aridity, setAridity] = useState([]);
    const [eutrophication, setEutrophication] = useState([]);
    const [poleotolerance, setPoleotolerance] = useState([]);

    let ari_points = []
    let eut_points = []
    let pol_points = []
   
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

            const res = await fetch(`${config.serverURL}/api/results/getData`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                })
            })
            if (res.status == 200){
                await res.json()
                .then( response =>{
                    response.map(point => {
                        
                        ari_points.push({ latitude: point.latitude, longitude: point.longitude, weight: point.indexes.aridity})
                        eut_points.push({ latitude: point.latitude, longitude: point.longitude, weight: point.indexes.eutrophication})
                        pol_points.push({ latitude: point.latitude, longitude: point.longitude, weight: point.indexes.poleotolerance})
                    })
    
                    setAridity(ari_points)
                    setEutrophication(eut_points)
                    setPoleotolerance(ari_points)
                })
            }
        })();
      
    }, []);
 
    const RegionChangeHandler = props => {
        setRegion(props);
        // prints new region dragged by user
        //console.log(region);
    }

    
     const metricsButton  = props => {
        if (metric == 'Aridity') setMetric('Eutrophication')
        else if (metric == 'Eutrophication') setMetric('Poleotolerance')
        else if (metric == 'Poleotolerance') setMetric('Aridity')
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
            //showsCompass= {true}
            rotateEnabled={true}>

            <Heatmap aridity={aridity} eutrophication={eutrophication} poleotolerance={poleotolerance} metric={metric}></Heatmap>
            </MapView>            
            <View style={{  width: '100%', height:30, top: 30,  backgroundColor: 'rgba(17,140,17,0.4)'}}></View>
            <Text style={styles.title}>{metric}</Text>
            <TouchableOpacity onPress={metricsButton} 
                         style={{position: 'absolute',
                        bottom: 115,
                        right: 10,
                        alignItems: 'center',
                         justifyContent: 'center',
                        //for center align
                        width: 55,
                        height: 55,
                        borderRadius: 100/2,
                        backgroundColor: 'white',
                        shadowColor: 'black',
                        shadowRadius: 2,
                        shadowOffset: {
                            width: 0,
                            height: 3},
                        shadowOpacity:'0.25%'}}>
                        <FontAwesome5  name={'layer-group'} size={20} color={Colors.primary} /> 
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    button: {
        width: 100,
        height: 100,
        borderRadius: 100/2,
    },
    title: {color:'white',
     fontSize: 12, 
     position: 'absolute',
     alignSelf: 'center',
     top: 38,
      fontWeight: 'bold', 
      opacity: 1 }
  });
export default MapExtension;