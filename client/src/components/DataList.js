import React from 'react';

import DataItem from './DataItem';

const DataList = props => {

    return (
        // Maps user list receive as prop as UserItem to be displayed
        props.dataList.map(input => {
        return (
            <DataItem
                key={input.timestamp}
                id={input._id}
                user={input.user}
                time={input.timestamp}
                data={input.data}
                removeData={props.removeData}
            />
        );
        })
    );
};

export default DataList;