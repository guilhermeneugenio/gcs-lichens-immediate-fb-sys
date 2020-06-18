export const Eutrophication_Gradient = {
    colors: ["lightcyan", "green" ],
    startPoints: [0.01 , 1.0],
    colorMapSize: 100
}

export function Eutrophication_Points (arg) {

    return(
        [
            { latitude: 38.7261461493852*arg, longitude: -9.131562151014805, weight: 10},
            { latitude: 38.72172160440991*arg, longitude: -9.130131863057613, weight: 10},
            { latitude: 38.72015393714589*arg, longitude: -9.130131863057613, weight: 10},
            { latitude: 38.7261461493852*arg, longitude: -9.131562151014805, weight: 10},
            { latitude: 38.72172160440991*arg, longitude: -9.130131863057613, weight: 100},
            { latitude: 38.72015393714589*arg, longitude: -9.130131863057613, weight: 10},
            { latitude: 38.72172160440991*arg, longitude: -9.130131863057613, weight: 100},
            { latitude: 38.72015393714589*arg, longitude: -9.130131863057613, weight: 50},
        
        ]

    )
}
