import presentation1 from "./presentation/presentation1";
import presentation2 from "./presentation/presentation2";
import presentation3 from "./presentation/presentation3";
import presentation4 from "./presentation/presentation4";
import presentation5 from "./presentation/presentation5";
const config = {
    presentation: [presentation1, presentation2, presentation3, presentation4, presentation5],
    credentials: {
        google: {
            webClientId: "608098992888-pk0vantp01d0avqh423djgodbpm1k86m.apps.googleusercontent.com",
            androidClientId: "529356542774-auedn00vtp1sjilf2qk5jfjpek22kb0i.apps.googleusercontent.com",
            iosClientId : "529356542774-qfahu5dns82aiv8irqo6qqfp0t044u21.apps.googleusercontent.com"
        }, 
        facebook: {
            appId: "666224524035848"
        }
    },
    serverURL: 'http://146.193.41.162/lif/server',
    //serverURL: 'http://192.168.0.101:3001',
    //Idioms of the app
    languages: ['pt', 'en'],
    //Ranking increase number per Survey
    ranking: 3
};

export default config;