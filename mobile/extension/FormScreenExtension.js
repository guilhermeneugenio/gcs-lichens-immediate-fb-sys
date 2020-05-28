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
import FeedbackHandler from './FeedbackHandler';
import config from './config';
import FormExtension from './FormExtension';

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
            else
                Alert.alert('ERROR', 'Form unavailable.');
        })();
        
        
        
    }, []);
    
    
  

    const onSubmit = async (data) => {
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

        // Notifications Handler: receives info from the config file
        FeedbackHandler(config.serverURL, config.notificationsInterval, config.notificationsTimeout);

        const feedback = await res.json();

        setDummy(!dummy);

        if (res.status == 200) {
            Alert.alert('SUCCESS', feedback.immediateFeedback);
            props.navigation.pop();
        }
        else Alert.alert('ERROR', 'Form unavailable.');
    };

    if (loaded === null)
        return <View style={styles.container}><Text style={styles.text}>Loading survey...</Text></View>
    else if (loaded === false)
        return <View style={styles.container}><Text style={styles.text}>Unable to load survey. Please go back.</Text></View>
    else
        return (
            <ScrollView style={styles.formContainer}>
                <Form key={dummy} json={form} extension={FormExtension} onSubmit={onSubmit} />
            </ScrollView>
        );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: Dimensions.get('window').width*0.05
    },
    formContainer: {
        width: '100%'
    }
});

export default FormScreenExtension;