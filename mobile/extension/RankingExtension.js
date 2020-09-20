import React from 'react';
import { View, Text, ImageBackground} from 'react-native';
import config from './config';

export async function updateRanking(points, email){
    await fetch(`${config.serverURL}/api/profile/editRanking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ranking:  points,
            email:  email
        })
    });
}

const RankingExtension = props => {

    var rankingLevel= 'Basic Starter' 

    if(props.ranking>20) rankingLevel= 'Amateur Explorer'
    if(props.ranking>40) rankingLevel= 'Good Explorer'
    if(props.ranking>60) rankingLevel= 'Pro Explorer'
    if(props.ranking>80) rankingLevel= 'Explorer Premium'

    return (
        <View style={{alignItems:'center'}}>
            <ImageBackground 
            imageStyle={{ borderRadius: 60/2 }} style={{ width: 60, height: 60, marginBottom:10}}
            source={{ uri: `${config.serverURL}/public/`+ rankingLevel + '.png' }} ></ImageBackground>
            <Text style={{color: Colors.primary, fontWeight: 'bold'}}>{rankingLevel}</Text> 
            <Text style={{color: Colors.secondary, fontSize: 11}}>Points : {props.ranking} </Text> 
        </View>
    );
};

export default RankingExtension;