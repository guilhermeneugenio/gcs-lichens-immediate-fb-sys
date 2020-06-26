import React from 'react';
import { IoIosRemoveCircle } from "react-icons/io";

const DataItem = props => {
    return (
        <div style={styles.itemContainer}>
            <p style={{display: 'flex', alignItems: 'center'}}>{props.user}{' - '}{props.time}{' - '}{JSON.stringify(props.data)}</p>
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
        justifyContent: 'space-between',
        backgroundColor: '#f4f4f4',
        padding: 10,
        borderBottom: '1px #ccc dotted',
        fontSize: 16
    }
};

export default DataItem;