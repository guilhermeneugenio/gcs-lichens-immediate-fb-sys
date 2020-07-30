import React from 'react';
import ResearcherPageExtension from '../extension/ResearcherExtension';

const ResearcherPage = props => {
    
    return (
        <React.Fragment>
            <h1>Researcher Page</h1>
            <ResearcherPageExtension onLogout={props.onLogout} reseacherEmail={props.userEmail} isLogged={props.isLogged}></ResearcherPageExtension>
        </React.Fragment>
    );
};

export default ResearcherPage;