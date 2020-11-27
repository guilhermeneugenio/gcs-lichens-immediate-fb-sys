import React from 'react';
import { IoIosRemoveCircle } from "react-icons/io";

const DataItem = props => {
    return (
        <div style={styles.itemContainer}>
            <div style={styles.dataContainer}>
                <p>User: {props.user}</p>
                <p>Timestamp: {props.time}</p>
                <p>Localização: {props.data[0].value.street}</p>
                <p>Cidade: {props.data[0].value.city}</p>
                <p>Data:</p>
                <p>Tree Bark Rugosity: {props.data[1].value[0]}</p>
                <p>Tree Trunk Diameter:{props.data[2].value}</p>
                <p>Lichens:</p>
                {props.data[3].value.map((value) => {
                    return (
                        <p>{value[0]} - {value[1]}%</p>
                    );
                })}
            </div>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <IoIosRemoveCircle style={{color: '#cc0000', fontSize: 36}} onClick={props.removeData.bind(this,props.id)} />
            </div>
        </div>
    );
};

// Styling
const styles = {
    itemContainer: {
        display: 'flex',
        alignItems:'center',
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderBottom: '1px #ccc dotted',
        fontSize: 16
    },
    dataContainer: {
        display: 'column',
        
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderBottom: '1px #ccc dotted',
        fontSize: 16
    }
};

export default DataItem;