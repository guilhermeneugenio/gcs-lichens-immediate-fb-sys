import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import  {Heatmap} from 'react-native-maps';

import config from '../config';
import { Aridity_Gradient, Eutrophication_Gradient, Poleotolerance_Gradient } from './metrics';

const HeatMap = props =>  {

    const [aridity, setAridity] = useState([]);
    const [eutrophication, setEutrophication] = useState([]);
    const [poleotolerance, setPoleotolerance] = useState([]);

    let ari_points = []
    let eut_points = []
    let pol_points = []

    useEffect(() => {
        (async () => {

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
                    setPoleotolerance(pol_points)
                })
            }
        })();
    }, []);



    
    return (
        <View>
            <Heatmap
                points={aridity}
                radius={50}
                opacity={0.5}
                gradient={Aridity_Gradient}>
            </Heatmap>
            <Heatmap
                points={eutrophication}
                radius={50}
                opacity={0.5}
                gradient={Eutrophication_Gradient}>
            </Heatmap>
            <Heatmap
                points={poleotolerance}
                radius={50}
                opacity={0.5}
                gradient={Poleotolerance_Gradient}>
            </Heatmap>
        </View>
    );
};

export default HeatMap;


