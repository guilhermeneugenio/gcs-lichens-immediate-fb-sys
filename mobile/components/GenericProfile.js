import React, {useEffect, useState} from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Keyboard, 
    TouchableOpacity, 
    ImageBackground, 
    KeyboardAvoidingView, 
    Dimensions,
    Alert,
    StatusBar,
    StyleSheet,
    TouchableWithoutFeedback} from 'react-native';

import config from '../extension/config';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import * as Permissions from 'expo-permissions';
import globalStyles from '../constants/globalStyles';
import RankingExtension from '../extension/RankingExtension'
import { MaterialIcons } from '@expo/vector-icons'; 
import dictionary from '../data/dictionary.json';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreenExtension = props => {

    const [ranking, setRanking] = useState(null);
    const [camera_RollPermission, setCamera_RollPermission] = useState(false);
    const [name, setName] = useState('');
    const [base64, setBase64] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        (async () => {

            const permissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setCamera_RollPermission(permissions.permissions.cameraRoll.status);

            const res = await fetch(`${config.serverURL}/api/users/getUser`,{
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
                    if(response[0].name) setName(response[0].name)
                    if(response[0].ranking) setRanking(response[0].ranking)
                    if(response[0].base64) setBase64(response[0].base64)
                })
            }
        })();
    }, [ranking]);

    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.05,
            });
            if (!result.cancelled) {
            setBase64(result.base64)
            
            }
        } catch (E) {
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR)
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
        data.append('base64', base64);
        const res = await fetch(`${config.serverURL}/api/users/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data
        });
        setEdit(false);
    };

    const editContent = () => setEdit(true);

    let content = (
        <View style={{flexDirection:'row', marginBottom:windowHeight*0.04 }}>
            <Text style={{color: 'black', marginTop:10, width:windowWidth*0.5, fontSize: windowWidth*0.04}}> {name}</Text>
            <TouchableOpacity onPress={editContent} style={styles.smalltouchable}>
                <MaterialIcons name="border-color" size={24} color="black" />
            </TouchableOpacity>
        </View> )
    
   if (edit) content = (
        <TextInput
        style={styles.textinput}
        placeholder={name}
        placeholderTextColor={Colors.secondary}
        value={name}
        onChangeText={nameInputHandler}/>)

    let photo = (
        <TouchableOpacity onPress={_pickImage} style={styles.touchable}>
            <MaterialIcons name="add-a-photo" size={40} color={Colors.primary}/>
        </TouchableOpacity> )

    if (base64) photo = ( 
        <View style={{alignItems:'flex-end', marginBottom: windowHeight*0.02}}>
            <ImageBackground 
                source={{ uri: `data:image/png;base64,${base64}`}}
                imageStyle={{ borderRadius: windowWidth*0.04 }} 
                style={{ width: windowWidth*0.60, height: windowHeight*0.18}}>
            </ImageBackground>
            <Text style={styles.uploadPhoto} onPress={_pickImage}> Update Photo</Text>
        </View>
    )

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "height"} 
            style={globalStyles.screen}>      
            <StatusBar barStyle="dark-content"/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    {photo}
                    <RankingExtension ranking={ranking}></RankingExtension>
                    <View style={{justifyContent:'flex-start'}}>
                    <Text style={{color: Colors.secondary, marginTop:windowHeight*0.02}}> Name</Text>
                        {content}
                    </View>
                    <CustomButton
                        title={'Update'}
                        onPress={update}
                        backgroundColor={Colors.primary}
                        textColor={'white'}
                        width={windowWidth*0.60}
                        height={windowHeight*0.045}
                        borderRadius={10}/>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        ...globalStyles.shadow, 
        backgroundColor:'white',
        borderRadius: windowWidth*0.05, 
        width: windowWidth*0.7, 
        height: windowHeight*0.55, 
        alignItems:'center', 
        paddingVertical: windowHeight*0.02
    },
    textinput: {
        ...globalStyles.formElement, 
        ...globalStyles.shadow, 
        width: windowWidth*0.60,
        marginBottom: windowHeight * 0.03,
        fontSize: (windowWidth + windowHeight) * 0.012
    },
    uploadPhoto: {
        color: Colors.secondary, 
        textDecorationLine: 'underline',
        fontSize: 10, 
        top:10 
    },
    touchable: {
        borderRadius: windowWidth*0.45/2, 
        width: windowWidth*0.45, 
        height: windowWidth*0.45, 
        alignItems:'center', 
        justifyContent:'center'
    },
    smalltouchable: {
        borderRadius: windowWidth*0.20/2, 
        width: windowWidth*0.10, 
        height: windowWidth*0.10, 
        alignItems:'center', 
        justifyContent:'center'

    },
});

export default ProfileScreenExtension;