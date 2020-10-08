import React from 'react';
import ResearcherPageExtension from '../extension/ResearcherExtension';

const ResearcherPage = props => {
    
    return (
        <React.Fragment>
            <ResearcherPageExtension onLogout={props.onLogout} reseacherEmail={props.userEmail} isLogged={props.isLogged}></ResearcherPageExtension>
        </React.Fragment>
    );
};

export default ResearcherPage;