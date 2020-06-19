import React from "react";
import MaterialTable from 'material-table'
import ChipsToolbar from "../chips_toolbar/ChipsToolbar";

const handleSelectionChange = (clickedRow, updateCheck) => {
    updateCheck(clickedRow);
}

const SelectableChipTable = (props) => {
    const { title, actions, columns, chipId, chipLabelName, chipColor, categories, items, updateSelected, updateCheck } = props;
    return (
        <MaterialTable
            title={title}
            columns={columns}
            data={items.selected}
            options={{
                selection: true,
                search: false,
                showSelectAllCheckbox: false,
            }}
            onSelectionChange={(_, clickedRow) => handleSelectionChange(clickedRow, updateCheck)}
            components={{
                Toolbar: toolbarProps =>
                    (<ChipsToolbar
                        {...toolbarProps}
                        id={chipId}
                        labelName={chipLabelName}
                        color={chipColor}
                        parentItems={categories}
                        items={items.all}
                        updateSelectedItems={updateSelected}
                    />),
            }}
            actions={actions}
        />
    );
}

export default SelectableChipTable;
