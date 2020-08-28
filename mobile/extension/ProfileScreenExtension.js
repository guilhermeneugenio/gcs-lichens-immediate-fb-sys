import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, Keyboard, TouchableOpacity, ImageBackground, KeyboardAvoidingView, SafeAreaView, Image, Dimensions, TouchableWithoutFeedback} from 'react-native';

import config from './config';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import * as Permissions from 'expo-permissions';
import globalStyles from '../constants/globalStyles';
import RankingExtension from './RankingExtension'
import { MaterialIcons } from '@expo/vector-icons'; 

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreenExtension = props => {

    const [ranking, setRanking] = useState(0);
    const [camera_RollPermission, setCamera_RollPermission] = useState(false);
    const [name, setName] = useState('');
    const [type, setType] = useState('');
    const [base64, setBase64] = useState('');

    useEffect(() => {
        (async () => {

            const permissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setCamera_RollPermission(permissions.permissions.cameraRoll.status);

            const res = await fetch(`${config.serverURL}/api/profile`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: props.navigation.state.params.email
                })
            })
            if (res.status == 200){
                await res.json()
                .then( response =>{
                    setName(response[0].name)
                    if(response[0].ranking)setRanking(response[0].ranking)
                    setBase64(response[0].base64)
                    setType(response[0].type)
                })
            }
        })();
    }, []);

    useEffect(() => {
    }, [base64]);

    _pickImage = async () => {
        try {
          let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.1,
          });
          if (!result.cancelled) {
            setBase64(result.base64)
            
          }
        } catch (E) {
          console.log(E);
        }
      };
    
    const nameInputHandler = (enteredName) => {
        setName(enteredName);
    };
 // Registers user with the server
 const update = async () => {
    const data = new FormData();
    data.append('email', props.navigation.state.params.email); 
    data.append('name', name); 
    data.append('base64', base64 );
    const res = await fetch(`${config.serverURL}/api/profile/edit`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        body: data
    });

        // If user already registered with inserted e-mail
        if (res.status == 200) console.log("ok")
};

let content = (<TouchableOpacity onPress={_pickImage} style={{  borderRadius: 60/2, width: 60, height: 60, backgroundColor: 'white', alignItems:'center', justifyContent:'center'}} ><MaterialIcons name="add-a-photo" size={40} color={Colors.primary} /></TouchableOpacity>)
if (base64) content = ( 
<View style={{alignItems:'flex-end', marginBottom: windowHeight*0.02}}>
    <ImageBackground imageStyle={{ borderRadius: windowWidth*0.04 }} style={{ width: windowWidth*0.60, height: windowHeight*0.18}} source={{ uri: `data:image/png;base64,${base64}` }}></ImageBackground>
    <Text style={{color: Colors.secondary, textDecorationLine: 'underline', fontSize: 10, top:10 }} onPress={_pickImage}> Update Photo</Text>
</View>
)

return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={globalStyles.androidSafeArea}>
        <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1, alignItems:'center', justifyContent:'center'}}>
                        <TouchableOpacity onPress={() => props.navigation.pop()} style={globalStyles.backButton}>
                        <Image style={{width: '100%', height: '100%', resizeMode: 'contain'}} source={require('../assets/back_btn.png')} />
                    </TouchableOpacity>
        <View style={{...globalStyles.shadow, backgroundColor:'white', borderRadius: windowWidth*0.05, width: windowWidth*0.7, height: windowHeight*0.55, alignItems:'center', justifyContent:'space-around', paddingVertical: windowHeight*0.02}}>
             

             
             {content}
             <RankingExtension ranking={ranking}></RankingExtension>
             <View style={{justifyContent:'flex-start'}}>
             <Text style={{color: Colors.secondary, marginTop:10}}> Name</Text>
             <TextInput
                        style={{        ...globalStyles.formElement, 
                            ...globalStyles.shadow, 
                            width: windowWidth*0.60,
                            marginBottom: windowHeight * 0.03,
                            fontSize: (windowWidth + windowHeight) * 0.012,}}
                        placeholder={name}
                        placeholderTextColor={Colors.secondary}
                        value={name}
                        onChangeText={nameInputHandler}
                    />
            </View>
            <CustomButton
                        title={'Update'}
                        onPress={update}
                        backgroundColor={Colors.primary}
                        textColor={'white'}
                        width={windowWidth*0.60}
                        height={windowHeight*0.045}
                        borderRadius={10}
                        />
    </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    );
};

export default ProfileScreenExtension;