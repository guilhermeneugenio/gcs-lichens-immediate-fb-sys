export const Aridity_Gradient = {
    colors: ["mistyrose" , "red" ],
    startPoints: [0.01, 1],
    colorMapSize: 100
}

export async function Aridity_Points (arg) {

    const res = await fetch(`http://192.168.1.7:3000/api/users/teste`,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    console.log(res);

    return(
        [
            { latitude: 38.722515102239285, longitude: -9.140250161290169, weight: 10},
            { latitude: 38.725030646642175, longitude: -9.146161749958992, weight: 10},
            { latitude: 38.72581116149843, longitude: -9.143641144037247, weight: 50},
            { latitude: 38.728326851420476, longitude: -9.142455272376537, weight: 120},
            { latitude: 38.729981652240355, longitude: -9.14504025131464, weight: 30},
            { latitude: 38.722515102239285, longitude: -9.140250161290169, weight: 10},
            { latitude: 38.725030646642175, longitude: -9.146161749958992, weight: 10},
            { latitude: 38.72581116149843, longitude: -9.143641144037247, weight: 10},
            { latitude: 38.728326851420476, longitude: -9.142455272376537, weight: 10},
            { latitude: 38.729981652240355, longitude: -9.14504025131464, weight: 30},
            { latitude: 38.722515102239285, longitude: -9.140250161290169, weight: 10},
            { latitude: 38.725030646642175, longitude: -9.146161749958992, weight: 10},
            { latitude: 38.72581116149843, longitude: -9.143641144037247, weight: 10},
            { latitude: 38.728326851420476, longitude: -9.142455272376537, weight: 10},
            { latitude: 38.729981652240355, longitude: -9.14504025131464, weight: 30},
            { latitude: 38.72581116149843, longitude: -9.143641144037247, weight: 50},
            { latitude: 38.72581116149843, longitude: -9.143641144037247, weight: 50},
            { latitude: 38.72581116149843, longitude: -9.143641144037247, weight: 50},   
        ]
    )
}