import React, { useState, useEffect } from 'react';
import { View , StyleSheet, TouchableOpacity, Text, SafeAreaView, StatusBar, Image} from 'react-native';
import MapView,  { PROVIDER_GOOGLE } from 'react-native-maps'

import globalStyles from '../../constants/globalStyles';
import * as Permissions from 'expo-permissions';
import { FontAwesome5 } from '@expo/vector-icons';
import  Heatmap from './HeatMap';
import dictionaryExtension from '../dictionaryExtension.json';
import dictionary from '../../data/dictionary.json';
import Colors from '../../constants/colors';
import * as Location from 'expo-location';
import config from '../config';

const MapExtension = props => {

    const [locationPermission, setLocationPermission] = useState(null);
    const [location, setLocation]= useState(null) 

    const [metric, setMetric] = useState('Aridity');
    
    const [aridity, setAridity] = useState([]);
    const [eutrophication, setEutrophication] = useState([]);
    const [poleotolerance, setPoleotolerance] = useState([]);

    let ari_points = []
    let eut_points = []
    let pol_points = []
   
    // State to store error message (not used)
    const [errorMessage, setErrorMessage] = useState('');

     // Get geolocation when component is used
     useEffect(() => {
        (async () => {
            
            const permissions = await Permissions.askAsync(Permissions.LOCATION);
            setLocationPermission(permissions.permissions.location.status);
            let location_ = await Location.getCurrentPositionAsync();
            setLocation({latitude:location_.coords.latitude, longitude:location_.coords.longitude, latitudeDelta: 0.0522,
                longitudeDelta: 0.0521});
                

            const res = await fetch(`${config.serverURL}/api/results/getData`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: props.navigation.state.params.email
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
            else if (res.status === 403) {
                Alert.alert(dictionary[props.language].ERROR, dictionaryExtension[props.navigation.state.params.language].ALREADY_USER);
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
        })();
      
    }, []);
 
    const RegionChangeHandler = props => {
        setLocation(props);
    }
  
    const HeatmapHandler  = () => {
        if(aridity.length>0 && eutrophication.length>0 && poleotolerance.length>0 ){
            return(<Heatmap aridity={aridity} eutrophication={eutrophication} poleotolerance={poleotolerance} metric={metric}></Heatmap>)
        } 
    }
    
     const metricsButton  = props => {
        if (metric == 'Aridity') setMetric('Eutrophication')
        else if (metric == 'Eutrophication') setMetric('Poleotolerance')
        else if (metric == 'Poleotolerance') setMetric('Aridity')
    }

    let metricContent = (<View></View>)
    if(metric == 'Aridity') metricContent = ( <Image style={{bottom: 160, right: -19, position: 'absolute', width: '30%', height: '30%', resizeMode: 'contain'}} source= {require("../../assets/aridity.png")}></Image>)
    else if (metric == 'Eutrophication') metricContent = ( <Image style={{bottom: 160, right: -19, position: 'absolute', width: '30%', height: '30%', resizeMode: 'contain'}} source= {require("../../assets/eutrophication.png")}></Image>)
    else if (metric == 'Poleotolerance')metricContent = ( <Image style={{bottom: 160, right: -19, position: 'absolute', width: '30%', height: '30%', resizeMode: 'contain'}} source= {require("../../assets/poleotolerance.png")}></Image>)

    if (location){
        return (
            <SafeAreaView style={globalStyles.androidSafeArea}>
                <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "default"}/>
                <View style={styles.map}>
                    <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={location}
                    onRegionChangeComplete={RegionChangeHandler}
                    showsUserLocation={true}
                    showsMyLocationButton={true}
                    //showsCompass= {true}
                    rotateEnabled={true}>
    
                    {HeatmapHandler()}
                    </MapView>
                    {metricContent}
                    <Text style={styles.title}>{metric}</Text>
                   
                    <TouchableOpacity onPress={metricsButton} 
                                style={{position: 'absolute',
                                bottom: 90,
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
            </SafeAreaView>
        )
    }
    else return (<View></View>)

    
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
    title: {color:'black',
     fontSize: 15, 
     bottom:50,
     position:'absolute',
     alignSelf: 'center',
      fontWeight: 'bold', 
      textTransform:'uppercase',
      letterSpacing: 2,
      opacity: 1 }
  });
export default MapExtension;