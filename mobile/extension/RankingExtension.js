import React, {useState} from 'react';
import { View, Text, ImageBackground} from 'react-native';
import config from './config';

export async function updateRanking(points, email){
    const res = await fetch(`${config.serverURL}/api/profile/editRanking`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ranking:  points,
            email:  email
        })
    });
    // If user already registered with inserted e-mail
    if (res.status == 200) console.log("ok")
}

const RankingExtension = props => {

    const [rankingLevel, setRankingLevel] = useState('Basic Starter');

    if(props.ranking>20) setRankingLevel=('Amateur Explorer')
    if(props.ranking>40) setRankingLevel=('Good Explorer')
    if(props.ranking>60) setRankingLevel=('Pro Explorer')
    else if(props.ranking>80) setRankingLevel=('Explorer Premium')



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