/* 
 * LandingPage (Component)
 * Description : Redirects the user according to its type on login
 * Props :
 * - isLogged: boolean flag indicating if the user is logged in 
 * - userType: indicates the type of user that is logged in, reasearcher or administrator
 */

// Imports
import React from 'react';
import { Redirect } from 'react-router-dom';
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import config from '../extension/config';

/************************************************
 * 
 * COMPONENT - Screen
 * 
 ************************************************/
const LandingPage = props => {

    /************************************************
     * PRE-RENDER
     ************************************************/
    // Default content
    let content = <React.Fragment></React.Fragment>;

    /************************************************
     * REDIRECT - ADMINPAGE
     ************************************************/
    // If admin is logged
    if (props.isLogged && props.userType === 'admin') content = <Redirect to={`${config.homepage}/admin`} />;

    /************************************************
     * REDIRECT - RESEARCHERPAGE
     ************************************************/
    // If researcher is logged
    if (props.isLogged && props.userType === 'researcher') content = <Redirect to={`${config.homepage}/researcher`} />;

    /************************************************
     * RENDER
     ************************************************/
    return (
        <React.Fragment>
            {content}
            <Map style={{ height: "87vh" }} center={ { lat: 38.726608, lng: -9.2005415}} zoom={13}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
              />
            </Map>
        </React.Fragment>
    );
};

export default LandingPage;