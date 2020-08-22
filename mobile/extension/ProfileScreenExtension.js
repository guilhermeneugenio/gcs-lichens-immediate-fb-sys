import React, {useEffect, useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';

import config from './config';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import * as Permissions from 'expo-permissions';
import globalStyles from '../constants/globalStyles';

import { MaterialIcons } from '@expo/vector-icons'; 

const ProfileScreenExtension = props => {

    const [ranking, setRanking] = useState(0);
    const [camera_RollPermission, setCamera_RollPermission] = useState(false);
    const [name, setName] = useState('');
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
                    setRanking(response[0].name)
                    setBase64(response[0].base64)
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
            aspect: [4, 3],
            quality: 1,
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
if (base64) content = ( <ImageBackground imageStyle={{ borderRadius: 60/2 }} style={{borderRadius: 60/2, width: 60, height: 60 }} source={{ uri: `data:image/png;base64,${base64}` }}></ImageBackground> )

return (
        <View style={globalStyles.screen}>
         <View style={globalStyles.formContainer}>
             {content}
             <Text style={{color: Colors.secondary}}>Ranking</Text>
             <Text>Imagem</Text>
             <Text>{ranking}</Text>   

             <Text style={{color: Colors.secondary}}>Email</Text>
             <TextInput
                        style={globalStyles.formElement}
                        placeholder={props.navigation.state.params.email}
                        placeholderTextColor={Colors.secondary}
                        value={props.navigation.state.params.email}
                        onChangeText={nameInputHandler}
                    />
             <Text style={{color: Colors.secondary}}>Name</Text>
             <TextInput
                        style={globalStyles.formElement}
                        placeholder={name}
                        placeholderTextColor={Colors.secondary}
                        value={name}
                        onChangeText={nameInputHandler}
                    />
            <View></View>
            <CustomButton
                title={'Update'}
                onPress={update}
                backgroundColor={Colors.secondary}
                textColor={Colors.primary}    
            />   


        </View>
    </View>
    );
};

export default ProfileScreenExtension;