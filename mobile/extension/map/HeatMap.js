import React from 'react';
import { View } from 'react-native';
import  {Heatmap} from 'react-native-maps';
import { Aridity_Gradient, Eutrophication_Gradient, Poleotolerance_Gradient } from './metrics';

const HeatMap = props =>  {
    let ari_opacity = 0
    let eut_opacity = 0
    let pol_opacity = 0

    if (props.metric == 'Aridity') ari_opacity = 0.5
    else if (props.metric == 'Eutrophication') eut_opacity = 0.5
    else if (props.metric == 'Poleotolerance') pol_opacity = 0.5

    return (
        <View>
            <Heatmap
                points={props.aridity}
                radius={50}
                opacity={ari_opacity}
                gradient={Aridity_Gradient}>
            </Heatmap>
            <Heatmap
                points={props.eutrophication}
                radius={50}
                opacity={eut_opacity}
                gradient={Eutrophication_Gradient}>
            </Heatmap>
            <Heatmap
                points={props.poleotolerance}
                radius={50}
                opacity={pol_opacity}
                gradient={Poleotolerance_Gradient}>
            </Heatmap>
        </View>
    );
};

export default HeatMap;


