import React from 'react';
import { View } from 'react-native';
import  {Heatmap} from 'react-native-maps';

import {Aridity_Gradient, Aridity_Points} from './metrics/aridity';
import {Eutrophication_Gradient, Eutrophication_Points} from './metrics/eutrophication';
import {Poleotolerance_Gradient, Poleotolerance_Points} from './metrics/poleotolerance';



const HeatMap= props => {
    return (
        <View>
            <Heatmap
                points={Aridity_Points(1)}
                radius={50}
                opacity={0.5}
                gradient={Aridity_Gradient}>
            </Heatmap>
            <Heatmap
                points={Eutrophication_Points(1)}
                radius={50}
                opacity={0.5}
                gradient={Eutrophication_Gradient}>
            </Heatmap>
            <Heatmap
                points={Poleotolerance_Points(1)}
                radius={50}
                opacity={0.5}
                gradient={Poleotolerance_Gradient}>
            </Heatmap>
        </View>
    );
};

export default HeatMap;


