import React, {useState, useReducer} from 'react';
import {
    View,
    Text,
    TextInput,
    Alert,
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    TouchableWithoutFeedback,
    Keyboard

} from 'react-native';

import config from '../extension/config';
import globalStyles from '../constants/globalStyles';
import Colors from '../constants/colors';

import CustomButton from '../components/CustomButton';
import MenuScreen from './MenuScreen';
import OAuthButtons from '../extension/OAuthButtons';
import LanguagePicker from '../components/LanguagePicker';

import dictionary from '../data/dictionary.json';

const windowWidth = Dimensions.get('window').width;

const MainScreen = props => {

    const [isLogged, setIsLogged] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [language, setLanguage] = useState('en');

   
    const changeLoggedState = (state, email, password) => {
        setIsLogged(state);
        setEmail(email);
        setPassword(password);
    };

    const emailInputHandler = (enteredEmail) => {
        setEmail(enteredEmail);
    };

    const passwordInputHandler = (enteredPassword) => {
        setPassword(enteredPassword);
    };

    const login = async () => {

        if (email.trim() !== '' && password.trim() !== '') {
            const res = await fetch(`${config.serverURL}/api/users/login`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: password,
                    email: email
                })
            });
            
            if (res.status == 404)
                Alert.alert('ERROR', 'User not registered.');
            else
                changeLoggedState(true, email, password);
        } else {
            Alert.alert('ERROR', 'All fields must be filled');
        }

    };

    let content = (
        <View style={globalStyles.screen} >
            <Text style={globalStyles.title}>Welcome!</Text>
            <View style={globalStyles.formContainer}>
                <TextInput
                    style={globalStyles.formElement}
                    placeholder="E-mail"
                    placeholderTextColor="#ccc"
                    value={email}
                    onChangeText={emailInputHandler}
                    />
                <TextInput
                    style={globalStyles.formElement}
                    placeholder="Password"
                    placeholderTextColor="#ccc"
                    value={password}
                    onChangeText={passwordInputHandler}
                    secureTextEntry={true}
                    />
                <CustomButton
                    title={dictionary[language].LOGIN}
                    onPress={login}
                    backgroundColor={Colors.secondary}
                    textColor={Colors.primary}
                    />
                <OAuthButtons method={'login'} onLogin={changeLoggedState} language={language} />

                <View style={styles.textContainer}>
                <Text style={styles.text}>{dictionary[language].NOT_REGISTERED} </Text>
                <TouchableOpacity onPress={() => props.navigation.navigate({routeName: 'Register', params: {language: language}})}>
                    <Text style={[styles.text, styles.textUnderline]}>{dictionary[language].CLICK_HERE}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <LanguagePicker
                language={language}
                setLanguage={newLanguage => setLanguage(newLanguage)}
            />
        </View>
    );

    if (isLogged)
    content = <MenuScreen navigation={props.navigation} onLogout={changeLoggedState} email={email} language={language}/>;

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={globalStyles.screen} >
                {content}        
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'column',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color:'#ccc',
        fontSize: windowWidth*0.04
    },
    textUnderline: {
        textDecorationLine: 'underline'
    }
});

MainScreen.navigationOptions = (navData) => {
    return (
        {
            headerTitle: 'Crowdsourcing'
        }
    );
};

export default MainScreen;