var db = require('../../modules/db');
var ObjectId = require('mongodb').ObjectID;

//calculos e array
function lichenIndex(lichen){
    let index = null;

    if (lichen == 'Flavoparmelia Caperata') index = 0;
    else if (lichen == 'Ramalina Fastigiata') index = 1;
    else if (lichen == 'Xanthoria Parietina') index = 2;
    else if (lichen == 'Chrysothrix Candelaris') index = 3;
    else if (lichen == 'Diploicia Canescens') index = 4;
    else if (lichen == 'Evernia Prunastri') index = 5;
    else if (lichen == 'Lecanora Allophana') index = 6;
    else if (lichen == 'Parmotrema Hypoleucinum') index = 7;
    else if (lichen == 'Physcia Adscendens') index = 8;
    else if (lichen == 'Usnea Rubicunda') index = 9;
    else if (lichen == 'Phaeophyscia Orbicularis') index = 10;
    else if (lichen == 'Hyperphyscia Adglutinata') index = 11;
    else if (lichen == 'Candelaria Concolor') index = 12;
    else if (lichen == 'Dendrographa Decolorans') index = 13;

    return index;
}

function metricHandler (table, lichens) {

    let aridity = [0,0,0,0,0];
    let poleotolerance = [0,0,0,0,0];
    let eutrophication = [0,0,0,0,0];
    let sum = 0;
    lichens.map(lichen => {
        aridity[table[0].lichens[lichenIndex(lichen[0])].metrics.aridity-1] += lichen[1]
        eutrophication[table[0].lichens[lichenIndex(lichen[0])].metrics.eutrophication-1] += lichen[1]
        poleotolerance[table[0].lichens[lichenIndex(lichen[0])].metrics.poleotolerance-1] += lichen[1]
        sum += lichen[1]
    })
    return { aridity: aridity,
             eutrophication: eutrophication,
             poleotolerance: poleotolerance,
             sum: sum };
  }

  function metricsNormalization(array){
    array[0]*= 0;
    array[1]*= 3;
    array[2]*= 6;
    array[3]*= 7;
    array[4]*= 10;
  }
  
  function indexHandler (metrics) {
    let aridIndex = 0;
    let eutdIndex = 0;
    let poldIndex = 0;
    metricsNormalization(metrics.aridity)
    metricsNormalization(metrics.eutrophication)
    metricsNormalization(metrics.poleotolerance)

    aridIndex = metrics.aridity.reduce(function(sum, curr) {return sum + curr;})/metrics.sum
    eutdIndex = metrics.eutrophication.reduce(function(sum, curr) {return sum + curr;})/metrics.sum
    poldIndex = metrics.poleotolerance.reduce(function(sum, curr) {return sum + curr;})/metrics.sum

   return { aridity: aridIndex,
            eutrophication: eutdIndex,
            poleotolerance: poldIndex };
  }

const fetchDiff1 = async (id) =>{
    const diff1 = await db.getDocument('diffFeedback1', {_id: ObjectId(id)});
    if (diff1.length === 0) {
        return fetchDiff1(id);
    }
    else {
        return diff1;
    }
};
const diffFeedback2 = async (newInput) => {
    
    let metrics = []
    let indexes = []    
    
    const inRange = await fetchDiff1(newInput._id);

    const metricsTable = await db.getDocument('process');
   
    inRange[0].rangeInputs.map(async zone => {
        metrics = metricHandler (metricsTable, zone.lichens)
        indexes = indexHandler(metrics)
        await db.updateDocument('diffFeedback2', {_id: zone._id} , {latitude: zone.latitude, longitude: zone.longitude, indexes: indexes });
    });

    
    await db.deleteDocument('diffFeedback1', {_id: ObjectId(newInput._id)}); 
    
};

exports.diffFeedback2 = diffFeedback2;