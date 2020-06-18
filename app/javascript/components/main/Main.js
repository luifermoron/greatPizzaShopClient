import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MaterialTable, { MTableToolbar } from 'material-table'
import AddBox from "@material-ui/icons/AddBox";
import ToolbarCategory from "../../components/toolbar_category/ToolbarCategory";

import { fetchAll } from "../../api/api";
import { useProducts } from "../main/hooks";



const handleSelectionChange = (clickedRow, updateCheckProducts) => {
  updateCheckProducts(clickedRow);
}

const Main = () => {
  const [categories, setCategories] = useState([]);
  const { products, updateAllProducts, updateSelectedProducts, updateCheckProducts } = useProducts();

  useEffect(() => { fetchAll(setCategories, updateAllProducts, updateSelectedProducts); }, []);

  return (
    <div style={{ display: 'flex', flex: 1, maxWidth: "100%", height: 1000, backgroundColor: 'blue' }} >
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
    </div>
  );
}

export default Main;
