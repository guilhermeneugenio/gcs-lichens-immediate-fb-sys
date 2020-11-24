
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DataList from '../components/DataList';
import config from '../extension/config';
import MainButton from '../components/MainButton';

const ResearcherPageExtension = props => {

    
    const [value, setValue] = useState('');
    // User list state
    const [dataList, setDataList] = useState([]);
    // Dummy state to force render
    const [dummyState, setDummyState] = useState(true);

    const [JSONshow, setJSONshow] = useState(false);
    

    // Get user list from server
    //after first render, each refresh and admin operation
    useEffect(() => {
        // Admin email to send to server
        const params = {researcherEmail: props.reseacherEmail};
        // Get user list from server
        axios.post(`${config.serverURL}/api/surveys/getData`, params)
        .then(res => {
            // If successful set user list
            setDataList(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [dummyState, props.reseacherEmail]);


    // Render user list when button clicked
    const renderDataList = () => {
        // Admin email to send to server
        const params = {researcherEmail: props.reseacherEmail};
        // Get user list from server
        axios.post(`${config.serverURL}/api/surveys/getData`, params)
        .then(res => {
            // If successful set user list
            setDataList(res.data);
        })
        .catch(error => {
            
            // If admin logged out reset session state
            if (error.response.status === 404)
                console.log(error);
        });
    };
    
    // Removes user from system
    const removeData = (_id) => {

        // Conatains user to be deleted and admin's credentials
        const params = {
            researcherEmail:props.reseacherEmail,
            id:_id
        }
        // Sends data to server to delete user from db
        axios.post(`${config.serverURL}/api/surveys/removeData`, params)
        .then(res => {
            // In case of success force render
            setDummyState(!dummyState);
        })
    };

    const onChangeText = (enteredValue) => {
        setValue(enteredValue.target.value);
    };

    const onChangeFile = event =>{
        
        var reader = new FileReader();

        reader.onload = function(){
            var data = reader.result;
            setValue(data);
        };
        
        if (typeof event.target.files[0] !== 'undefined')
            reader.readAsText(event.target.files[0]);
        else
            setValue('');
    };


    const jsonHandler = (param, email)  => {   
        const params = {
            'json': param,
            'email': email
        };

        axios.post(`${config.serverURL}/api/surveys/submit`, params)
        .then(res => {
            // If successful set user list
            console.log(res.status);
        })
        .catch(error => {
            console.log(error);
        });
        setValue('');
    };

    // Default content with user list and refresh button
    let content = (
        <React.Fragment>
            <DataList dataList={dataList} removeData={removeData}/>
            <MainButton title='Update' onClick={renderDataList} />
        </React.Fragment>
    );

    // Fallout text for empty user list
    if (dataList.length === 0)
        content = (
            <React.Fragment>
                <h3>No data found in the database!</h3>
                <MainButton title='Update' onClick={renderDataList} />
            </React.Fragment>
        );
    let JSONUploader = (<React.Fragment ><MainButton title='Upload JSON' onClick={() => { setJSONshow(true) }}></MainButton></React.Fragment>)

    if (JSONshow)
    JSONUploader = (<React.Fragment >
            <textarea placeholder="Write your JSON Form here!" rows='10' className='textarea' value={value} onChange={onChangeText} />
            <input className="fileInput" type="file" name="form" accept=".json" onChange={onChangeFile} />
            <MainButton title='Send JSON' onClick={jsonHandler.bind(this, value, props.userEmail)}></MainButton>
        </React.Fragment>)
    
    return (
        <React.Fragment >
           {JSONUploader}
            {content}
        </React.Fragment>
    );
};

export default ResearcherPageExtension;
    
