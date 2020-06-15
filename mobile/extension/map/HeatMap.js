import React from 'react';
import { View } from 'react-native';
import  {Heatmap} from 'react-native-maps';

import Aridity from './metrics/aridity';
import Eutrophication from './metrics/eutrophication';
import Poleotolerance from './metrics/poleotolerance';


const HeatMap= props => {
    return (
        <View>
            <Heatmap
                points={Aridity.Points}
                radius={50}
                opacity={0.5}
                gradient={Aridity.Gradient}>
            </Heatmap>
            <Heatmap
                points={Eutrophication.Points}
                radius={50}
                opacity={0.5}
                gradient={Eutrophication.Gradient}>
            </Heatmap>
            <Heatmap
                points={Poleotolerance.Points}
                radius={50}
                opacity={0.5}
                gradient={Poleotolerance.Gradient}>
            </Heatmap>
        </View>
    );
};

export default HeatMap;


