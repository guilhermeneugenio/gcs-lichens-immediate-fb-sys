import React from 'react';
import ResearcherExtension from '../extension/ResearcherExtension';

const ResearcherPage = props => {
    
    return (
        <React.Fragment>
            <h1>Researcher Page</h1>
            <ResearcherExtension reseacherEmail={props.userEmail}></ResearcherExtension>
        </React.Fragment>
    );
};

export default ResearcherPage;