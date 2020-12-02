var db = require('../../modules/db');
var config = require('../config')

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
function getDistanceFromLatLonInMobject(lat1, lon1, lat2, lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c * 1000; // Distance in km
  return d;
}
//este servia para sacar tudo de lá e aglomerar tudo o que fosse perto numa so cena
const diffFeedback1 = async (req, res) => {
  let newInput = req.body.answer;
  
  let distance = 0;
  let DiffFeedback1 = [{_id: newInput._id, latitude: newInput.data[0].value.latitude, longitude: newInput.data[0].value.longitude, lichens: [] }];
  let inRange = [];
  const promise = await db.getDocument('answers');
 
  Promise.all(promise).then((answers)=>{
    answers.map( object => {
      distance = getDistanceFromLatLonInMobject(newInput.data[0].value.latitude, newInput.data[0].value.longitude, object.data[0].value.latitude, object.data[0].value.longitude)
      if(distance <= config.distance){
        object.data[3].value.map(lichen =>{  DiffFeedback1[0].lichens.push( lichen )});
        inRange.push({_id: object._id, latitude: object.data[0].value.latitude, longitude: object.data[0].value.longitude})
      } 
      
    })
  
    inRange.map( (rangeInput, index) => {
      if(rangeInput._id.toString() != newInput._id.toString()){
        DiffFeedback1.push({_id: rangeInput._id, latitude: rangeInput.latitude, longitude: rangeInput.longitude, lichens: [] })
        answers.map( object => {
          distance = getDistanceFromLatLonInMobject(rangeInput.latitude, rangeInput.longitude, object.data[0].value.latitude, object.data[0].value.longitude)
          if(distance <= config.distance) object.data[3].value.map(lichen =>{ DiffFeedback1[index+1].lichens.push( lichen )}); 
        })
      }
    })
  })
  console.log(DiffFeedback1);
  await db.insertDocument('diffFeedback1', {_id: newInput._id , rangeInputs: DiffFeedback1});
}
exports.diffFeedback1 = diffFeedback1;