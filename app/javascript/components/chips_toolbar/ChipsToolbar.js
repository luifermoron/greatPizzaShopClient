import React from "react";
import Chip from '@material-ui/core/Chip';
import { MTableToolbar } from 'material-table'

const onSelectCategory = (id, items, updateSelectedItems) => {
    updateSelectedItems(items, id);
}

const ChipsToolbar = (props) => {
    const { parentItems, items, updateSelectedItems, labelName, color, id } = props;
    return (
        <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '0px 10px' }}>
                {
                    parentItems.map(parentItem =>
                        (<Chip
                            id={parentItem[id]}
                            label={parentItem[labelName]}
                            color={color}
                            style={{ marginRight: 5 }}
                            onClick={(object) => onSelectCategory(parentItem[id], items, updateSelectedItems)}
                        />))
                }
            </div>
        </div>
    );
}

export default ChipsToolbar;
