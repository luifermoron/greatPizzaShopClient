import React from "react";
import MaterialTable from 'material-table'
import AddBox from "@material-ui/icons/AddBox";
import ToolbarCategory from "../../components/toolbar_category/ToolbarCategory";

const handleSelectionChange = (clickedRow, updateCheckProducts) => {
    updateCheckProducts(clickedRow);
}

const Menu = (props) => {
    const { categories, products, updateSelectedProducts, updateCheckProducts } = props;
    return (
        <MaterialTable
            title="Menu"
            columns={[
                { title: 'Id', field: 'id' },
                { title: 'Name', field: 'name' },
                { title: 'Description', field: 'description' },
            ]}
            data={products.selected}
            options={{
                selection: true,
                search: false,
                showSelectAllCheckbox: false,
            }}
            onSelectionChange={(_, clickedRow) => handleSelectionChange(clickedRow, updateCheckProducts)}
            components={{
                Toolbar: toolbarProps =>
                    (<ToolbarCategory
                        {...toolbarProps}
                        categories={categories}
                        products={products}
                        updateSelectedProducts={updateSelectedProducts}
                    />),
            }}
            actions={[
                {
                    tooltip: 'Add for editing section',
                    icon: () => <AddBox></AddBox>,
                    onClick: (evt, data) => alert('You want to delete ' + data.length + ' rows')
                }
            ]}
        />
    );
}

export default Menu;
