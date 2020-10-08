import React from 'react';
import { Redirect } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

const LandingPage = props => {

    const position = [51.505, -0.09]


    // Default content
    let content = (<div></div>);
    // If admin is logged
    if (props.isLogged && props.userType === 'admin')
        content = <Redirect to='/admin' />;
    // If researcher is logged
    if (props.isLogged && props.userType === 'researcher')
    content = <Redirect to='/researcher' />;
    
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