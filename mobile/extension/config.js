import presentation1 from "./presentation/presentation1";
import presentation2 from "./presentation/presentation2";
import presentation3 from "./presentation/presentation3";
const config = {
    presentation: [presentation1, presentation2, presentation3],
    credentials: {
        google: {
            webClientId: "608098992888-pk0vantp01d0avqh423djgodbpm1k86m.apps.googleusercontent.com",
            androidClientId: "608098992888-f7pie3rd6osvls6jt04naaqeivd2m68j.apps.googleusercontent.com",
            iosClientId : "608098992888-v6gts7tcib7i4p6rv041kbklk2qk78lf.apps.googleusercontent.com"
        },
        facebook: {
            appId: "534270243959641"
        }
    },
    //serverURL: 'http://146.193.41.162/lif/server',
    serverURL: 'http://192.168.1.69:3001',
    //Idioms of the app
    languages:['pt','en'],
    ranking: 3
};

export default config;