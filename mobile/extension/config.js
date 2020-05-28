const config = {
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
    serverURL: 'http://192.168.1.69:3000',
    // In ms
    notificationsInterval: 5000,
    // Number of calls
    notificationsTimeout: 20,
};

export default config;