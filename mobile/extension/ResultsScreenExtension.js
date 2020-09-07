import React from 'react';
import MapExtension from './map/MapExtension';

const ResultsScreenExtension = props => {
    return (
      <MapExtension navigation={props.navigation} ></MapExtension>
    );
};

export default ResultsScreenExtension;