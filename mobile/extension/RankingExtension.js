import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, KeyboardAvoidingView} from 'react-native';

import config from './config';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import * as Permissions from 'expo-permissions';
import globalStyles from '../constants/globalStyles';

import { MaterialIcons } from '@expo/vector-icons'; 

const RankingExtension = props => {

    const [rankingLevel, setRankingLevel] = useState('Basic Starter');

    if(props.ranking>20) setRankingLevel=('Amateur Explorer')
    if(props.ranking>40) setRankingLevel=('Good Explorer')
    if(props.ranking>60) setRankingLevel=('Pro Explorer')
    if(props.ranking>80) setRankingLevel=('Explorer Premium')

return (
    <View style={{alignItems:'center'}}>
        <ImageBackground 
        imageStyle={{ borderRadius: 60/2 }} style={{ width: 60, height: 60, marginBottom:10}}
        source={{ uri: 'http://192.168.0.101:3000/public/'+ rankingLevel + '.png' }} ></ImageBackground>
        <Text style={{color: 'white', fontWeight: 'bold'}}>{rankingLevel}</Text> 
        <Text style={{color: Colors.secondary, fontSize: 11}}>Points : {props.ranking} </Text> 
    </View>
    );
};

export default RankingExtension;