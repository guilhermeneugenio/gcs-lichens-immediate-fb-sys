import React from 'react';
import { IoIosRemoveCircle } from "react-icons/io";

const DataItem = props => {
    console.log(props)
    return (
        <div style={styles.itemContainer}>
            <div style={styles.dataContainer}>
                <p>User: {props.user}</p>
                <p>Timestamp: {props.time}</p>
                {props.data[0].value.map((value) => {
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