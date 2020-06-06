import React from 'react';
import  {Heatmap} from 'react-native-maps'


const Gradient = {
    colors: ['lawngreen','gold', 'orange' , "red" ],
    startPoints: [0.1, 0.25, 0.5 ,1.0],
    colorMapSize: 200
}

const Points = [

    { latitude: 37.14210845754444, longitude: -8.573595620691776, weight: 10},
    { latitude: 37.14210845754444, longitude: -8.573595620691776, weight: 10},
    { latitude: 37.14210845754444, longitude: -8.573595620691776, weight: 10},
    { latitude: 37.14210845754444, longitude: -8.573595620691776, weight: 10},
    { latitude: 37.141696338199175, longitude: -8.572379909455776, weight: 30},
    { latitude: 37.143379014530254, longitude: -8.570939563214779, weight: 50},
    { latitude: 37.142693968495266, longitude: -8.573038056492805, weight: 20}, 
    { latitude: 37.143379014540354, longitude: -8.570939563214779, weight: 50},
    { latitude: 37.142693968495266, longitude: -8.573038056492805, weight: 20}, 
    { latitude: 37.143379014540354, longitude: -8.570939563214779, weight: 50},
    { latitude: 37.142693968495266, longitude: -8.573038056492805, weight: 20}, 
    { latitude: 37.143379014540354, longitude: -8.570939563214779, weight: 50},
    { latitude: 37.142693968495266, longitude: -8.573038056492805, weight: 20}, 
    { latitude: 37.143379014540354, longitude: -8.570939563214779, weight: 50},
    { latitude: 37.142693968495266, longitude: -8.573038056492805, weight: 20}, 


]

const HeatMap= props => {
    return (
        <Heatmap
        points={Points}
        radius={50}
        opacity={0.5}
        gradient={Gradient}>
     </Heatmap>
    );
};

export default HeatMap;


