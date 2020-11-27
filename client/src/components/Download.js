import React, { useState, useEffect } from "react";
import DownloadLink from "react-download-link";
import config from "../extension/config";
import axios from "axios";

const Download = props => {

     const [answers, setAnswers] = useState(null);

    useEffect(() => {
        if (typeof props.exportFile === 'undefined') {
            const params = {
              email: props.userEmail,
              data: "answers",
            };
           axios
             .post(`${config.serverURL}/api/researcher/getData`, params)
             .then((res) => {
                 if (res.status === 200) {
                 setAnswers(res.data.data);
               }
             })
             .catch((error) => {
               if (error.response.status === 403) {
                 console.log(error.response.status);
                 props.onLogout(false, "", "");
               }
             });  
        }   
    },)
    return (
      <React.Fragment>
        <DownloadLink
          label={props.label || "Download Answers"}
          filename={props.filename || "answers.json"}
          exportFile={answers !== null ? () => {JSON.stringify(answers, null, 2)}: props.exportFile}
        />
      </React.Fragment>
    );
};
export default Download;
