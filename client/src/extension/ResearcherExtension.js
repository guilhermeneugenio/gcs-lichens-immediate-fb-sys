
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import DataList from '../components/DataList';
import config from '../extension/config';
import MainButton from '../components/MainButton';

const ResearcherExtension = props => {

    
    // User list state
    const [dataList, setDataList] = useState([]);
    // Dummy state to force render
    const [dummyState, setDummyState] = useState(true);

    // Render user list when button clicked
    const renderDataList = () => {
        // Admin email to send to server
        const params = {researcherEmail: props.reseacherEmail};
        // Get user list from server
        axios.post(`${config.serverURL}/api/surveys/rawData`, params)
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
        .catch(error => {
            console.log(error);
            // if incorrect admin password
            //if (error.response.status === 404)
                //alert('ERROR : Researcher not logged in.');
            // If admin logged out reset session state
        });
    };

    // Get user list from server
    //after first render, each refresh and admin operation
    useEffect(() => {
        // Admin email to send to server
        const params = {researcherEmail: props.reseacherEmail};
        // Get user list from server
        axios.post(`${config.serverURL}/api/surveys/rawData`, params)
        .then(res => {
            // If successful set user list
            setDataList(res.data);
        })
        .catch(error => {
            console.log(error);
        });
    }, [dummyState, props.reseacherEmail]);

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
                <h3>No survey data found in the database!</h3>
                <MainButton title='Update' onClick={renderDataList} />
            </React.Fragment>
        );

    return (
        <React.Fragment >
            {content}
        </React.Fragment>
    );
};

export default ResearcherExtension;
    
