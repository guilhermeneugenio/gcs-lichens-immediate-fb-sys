import React, { useEffect, useState } from 'react';

import {
    ScrollView,
    View,
    Text,
    Alert, 
    StyleSheet,
    Dimensions
} from 'react-native';

import {Form} from 'react-native-json-forms';
import config from './config';
import FormExtension from './FormExtension';
import {updateRanking} from './RankingExtension';
import dictionaryExtension from './dictionaryExtension.json';
import dictionary from '../data/dictionary.json';

const FormScreenExtension = props => {

    const [loaded, setLoaded] = useState(null);
    const [form, setForm] = useState(null);
    const [dummy, setDummy] = useState(true);

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
            Alert.alert('SUCCESS', feedback.immediateFeedback);
            props.navigation.pop();
        }
        if (res.status === 403 || res.status === 403) {
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR, dictionaryExtension[props.navigation.state.params.language].ALREADY_USER);
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }

        updateRanking(3, props.navigation.state.params.email);
    };

    if (loaded === null)
        return <View style={styles.container}><Text style={styles.text}>Loading survey...</Text></View>
    else if (loaded === false)
        return <View style={styles.container}><Text style={styles.text}>Unable to load survey. Please go back.</Text></View>
    else
        return (
            <ScrollView style={styles.formContainer} scrollIndicatorInsets={{ right: 1 }}>
                <Form key={dummy} json={form} extension={FormExtension} onSubmit={onSubmit} />
            </ScrollView>
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