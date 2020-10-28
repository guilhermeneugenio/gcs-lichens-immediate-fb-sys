import React, { useEffect, useState } from 'react';

import {
    ScrollView,
    View,
    Text,
    Alert, 
    StyleSheet,
    Dimensions,
    StatusBar,
    Modal,
    Image,
} from 'react-native';

import {Form} from 'react-native-json-forms';
import config from './config';
import FormExtension from './FormExtension';
import {updateRanking} from './RankingExtension';
import dictionaryExtension from './dictionaryExtension.json';
import dictionary from '../data/dictionary.json';
import LichensImagePickerStylesheet from './LichensImagePickerStylesheet';
import CustomButton from '../components/CustomButton';
import Colors from '../constants/colors'

const FormScreenExtension = props => {

    const [loaded, setLoaded] = useState(null);
    const [form, setForm] = useState(null);
    const [dummy, setDummy] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const res = await fetch(`${config.serverURL}/api/surveys/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email
                })
            });
    
            if (res.status == 200){
                setForm(await res.json());
                setLoaded(true);
            }
            else if (res.status === 403) {
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionaryExtension[props.navigation.state.params.language].ALREADY_USER);
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else if(res.status == 404){
                Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionaryExtension[props.navigation.state.params.language].FORM_UNAVAILABLE);
            }
                
        })();
    }, []);
    
    
    const onSubmit = async (data) => {
        
        let index = null;
        let photo = new FormData();
        data.map((d, i) => {
            if (d.type === 'camera') {
               
                photo.append("image_data", d.value);
                photo.append("email", props.navigation.state.params.email);
                index = i;
                d.value = '';
            }
        });

        const res = await fetch(`${config.serverURL}/api/surveys/answer`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                answer: data
            })
        });

        //If the user sends a photo in the survey
        /*if(index !== null){
            const resPhoto = await fetch(`${config.serverURL}/api/surveys/answerPhoto`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                },
                body: photo
            });
        };*/

        const feedback = await res.json();

        setDummy(!dummy);

        if (res.status == 200) {
            setModalVisible(!modalVisible)
        }
        if (res.status === 403 || res.status === 403) {
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionaryExtension[props.navigation.state.params.language].ALREADY_USER);
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }

        updateRanking( config.ranking, props.navigation.state.params.email );
    };

    const modalHandler = () => {
        setModalVisible(!modalVisible)
        props.navigation.navigate({
            routeName: "Results",
            params: {
              email: props.navigation.state.params.email,
              language: props.navigation.state.params.language,
            },
          })
         
    }

    if (loaded === null)
        return <View style={styles.container}><Text style={styles.text}>Loading survey...</Text></View>
    else if (loaded === false)
        return <View style={styles.container}><Text style={styles.text}>Unable to load survey. Please go back.</Text></View>
    else
        return (
            <View>
                <ScrollView style={styles.formContainer} scrollIndicatorInsets={{ right: 1 }}>
                    <Modal visible={modalVisible} animationType="fade" transparent={true}>
                        <View style={LichensImagePickerStylesheet.centeredView}>
                            <View style={LichensImagePickerStylesheet.modalView}>
                                <Text>{dictionary[props.navigation.state.params.language].SUCCESS}</Text>
                                <Image style={{width: 100, height:100}} source= {require("../assets/notification.gif")}></Image>         
                                <Text> {dictionaryExtension[props.navigation.state.params.language].MAP} </Text>
                                <Text  style={{marginBottom:20}} >{dictionaryExtension[props.navigation.state.params.language].CLICK}</Text>
                                <CustomButton
                                title={'Results'}
                                onPress={modalHandler}
                                backgroundColor={Colors.primary}
                                textColor={"white"}
                                width={ Dimensions.get('window').width*0.6}
                                height={ Dimensions.get('window').height*0.045}
                                borderRadius={10}
                                />
                            </View>
                        </View>
                    </Modal>
                    <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "default"}/>
                    <Form key={dummy} json={form} extension={FormExtension} onSubmit={onSubmit} />
                </ScrollView>
            </View>
            
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin:90
    },
    text: {
        fontSize: Dimensions.get('window').width*0.05
    },
    formContainer: {
        width: '100%'
    }
});

export default FormScreenExtension;