import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

import config from '../config';
import * as Google from 'expo-google-app-auth';

const GoogleFitSensor = props => {

    const [stop, setStop] = useState(false);

    useEffect(() => {

      if (stop === false)
        googleResponse();

    }, []);

    const googleResponse = async() => {
        try {
          const { type, accessToken, user } = await Google.logInAsync({
            androidClientId: config.credentials.google.androidClientId,
            iosClientId: config.credentials.google.iosClientId,
            scopes: [
                "profile",
                "email",
                "https://www.googleapis.com/auth/fitness.activity.read", 
                "https://www.googleapis.com/auth/fitness.activity.read",
                "https://www.googleapis.com/auth/fitness.activity.write",
                "https://www.googleapis.com/auth/fitness.location.read",
                "https://www.googleapis.com/auth/fitness.location.write",
                "https://www.googleapis.com/auth/fitness.body.read",
                "https://www.googleapis.com/auth/fitness.body.write",
                "https://www.googleapis.com/auth/fitness.nutrition.read",
                "https://www.googleapis.com/auth/fitness.nutrition.write",
                "https://www.googleapis.com/auth/fitness.blood_pressure.read",
                "https://www.googleapis.com/auth/fitness.blood_pressure.write",
                "https://www.googleapis.com/auth/fitness.blood_glucose.read",
                "https://www.googleapis.com/auth/fitness.blood_glucose.write",
                "https://www.googleapis.com/auth/fitness.oxygen_saturation.read",
                "https://www.googleapis.com/auth/fitness.oxygen_saturation.write",
                "https://www.googleapis.com/auth/fitness.body_temperature.read",
                "https://www.googleapis.com/auth/fitness.body_temperature.write",
                "https://www.googleapis.com/auth/fitness.reproductive_health.read",
                "https://www.googleapis.com/auth/fitness.reproductive_health.write"
            ]
          })
          if (type === "success") {

            const now = new Date();
            
            let dataTypeName;
            let dataSourceId;
            let final = [];
            let value;

            props.config.data.map(async data => {

              if (data === 'steps') {
                dataTypeName = 'com.google.activity.segment';
                dataSourceId = 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps';
              }
              else if (data === 'distance') {
                dataTypeName = 'com.google.distance.delta';
                dataSourceId = 'derived:com.google.distance.delta:com.google.android.gms:from_steps<-merge_step_deltas';
              }
              else if (data === 'calories') {
                dataTypeName = 'com.google.calories.expended';
                dataSourceId = 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended';
              }
              else if (data === 'activeMinutes') {
                dataTypeName = 'com.google.active_minutes';
                dataSourceId = 'derived:com.google.active_minutes:com.google.android.gms:from_steps<-estimated_steps';
              }
  
              let res = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
                  method: 'POST',
                  headers: { Authorization: `Bearer ${accessToken}` },
                  body: JSON.stringify({
                      "aggregateBy": [{
                        "dataTypeName": dataTypeName,
                        "dataSourceId": dataSourceId
                      }],
                      "bucketByTime": { "durationMillis": now.getTime() - (now.getTime()-24*60*60*1000) },
                      "startTimeMillis": now.getTime()-24*60*60*1000,
                      "endTimeMillis": now.getTime()
                    })
              });
  
              const sources = await res.json();

              if (data === 'steps') {
                if (sources.bucket.length === 0) value = {type: 'steps', value: ''};
                else if (sources.bucket[0].dataset.length === 0) value = {type: 'steps', value: ''};
                else if (sources.bucket[0].dataset[0].point.length === 0) value = {type: 'steps', value: ''};
                else if (sources.bucket[0].dataset[0].point[0].value.length === 0) value = {type: 'steps', value: ''};
                else value = {type: 'steps', value: sources.bucket[0].dataset[0].point[0].value[0].intVal};
              }
              else if (data === 'distance') {
                if (sources.bucket.length === 0) value = {type: 'distance', value: ''};
                else if (sources.bucket[0].dataset.length === 0) value = {type: 'distance', value: ''};
                else if (sources.bucket[0].dataset[0].point.length === 0) value = {type: 'distance', value: ''};
                else if (sources.bucket[0].dataset[0].point[0].value.length === 0) value = {type: 'distance', value: ''};
                else value = {type: 'distance', value: sources.bucket[0].dataset[0].point[0].value[0].fpVal};
              }
              else if (data === 'calories') {
                if (sources.bucket.length === 0) value = {type: 'calories', value: ''};
                else if (sources.bucket[0].dataset.length === 0) value = {type: 'calories', value: ''};
                else if (sources.bucket[0].dataset[0].point.length === 0) value = {type: 'calories', value: ''};
                else if (sources.bucket[0].dataset[0].point[0].value.length === 0) value = {type: 'calories', value: ''};
                else value = {type: 'calories', value: sources.bucket[0].dataset[0].point[0].value[0].fpVal};
              }
              else if (data === 'activeMinutes') {
                if (sources.bucket.length === 0) value = {type: 'activeMinutes', value: ''};
                else if (sources.bucket[0].dataset.length === 0) value = {type: 'activeMinutes', value: ''};
                else if (sources.bucket[0].dataset[0].point.length === 0) value = {type: 'activeMinutes', value: ''};
                else if (sources.bucket[0].dataset[0].point[0].value.length === 0) value = {type: 'activeMinutes', value: ''};
                else value = {type: 'activeMinutes', value: sources.bucket[0].dataset[0].point[0].value[0].intVal};
              }
              else value = 0;

              final.push(value);
            
              if (final.length === props.config.data.length) {
                props.onChange(props.pageIndex, props.index, {sensor: 'googlefit', data: final});
                setStop(true);
              }

            });
            

          } else {
            // If user closes pop up window
            console.log("cancelled");
          }
        } catch (e) {
          // Session errors
          console.log("error", e);
        }
      };

    return <View />;
};

export default GoogleFitSensor;