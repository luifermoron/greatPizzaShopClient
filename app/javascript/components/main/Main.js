import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MaterialTable, { MTableToolbar } from 'material-table'
import AddBox from "@material-ui/icons/AddBox";


import SelectableChipTable from "../selectable_chip_table/SelectableChipTable";


import { MENU_TITLE, MENU_CHIP_ID, MENU_CHIP_LABEL_NAME, MENU_CHIP_COLOR, MENU_COLUMNS } from "../../constants/Constants";
import { PRODUCT_CUSTOMIZATION_CHIP_ID, PRODUCT_CUSTOMIZATION_CHIP_LABEL_NAME, PRODUCT_CUSTOMIZATION_CHIP_COLOR, PRODUCT_CUSTOMIZATION_COLUMNS } from "../../constants/Constants";

import { fetchAll } from "../../api/api";
import { useItems, filterByCategoryID, filterByTypeProperty } from "../main/hooks";
import { container, column } from "./styles";


const customizeProduct = (evt, data) => {
  alert('You want to delete ' + data.length + ' rows');
}


const addProductToOrderDetail = (evt, data) => {
  alert('You want to delete ' + data.length + ' rows');
}

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [typeProperties, setTypeProperties] = useState([]);

  const { items: products, 
          updateAll: updateAllProducts, 
          updateSelected: updateSelectedProducts, 
          updateCheck: updateCheckProducts 
        } = useItems(filterByCategoryID);

  const { items: productProperties, 
          updateAll: updateAllProductProperties, 
          updateSelected: updateSelectedProductProperties, 
          updateCheck: updateCheckProductProperties 
        } = useItems(filterByTypeProperty, false);

  useEffect(() => { fetchAll(setCategories, updateAllProducts, updateSelectedProducts, 
                             setTypeProperties, updateAllProductProperties, updateSelectedProductProperties); 
                  }, []);

  return (
    <div style={container}>
      <div style={column}>
        <SelectableChipTable
          title={MENU_TITLE}
          columns={MENU_COLUMNS}
          chipId={MENU_CHIP_ID}
          chipLabelName={MENU_CHIP_LABEL_NAME}
          chipColor={MENU_CHIP_COLOR}
          categories={categories}
          items={products}
          updateSelected={updateSelectedProducts}
          updateCheck={updateCheckProducts}
          onAddPressed={customizeProduct}
        />
        <SelectableChipTable
          title={"menu"}
          columns={PRODUCT_CUSTOMIZATION_COLUMNS}
          chipId={PRODUCT_CUSTOMIZATION_CHIP_ID}
          chipLabelName={PRODUCT_CUSTOMIZATION_CHIP_LABEL_NAME}
          chipColor={PRODUCT_CUSTOMIZATION_CHIP_COLOR}
          categories={typeProperties}
          items={productProperties}
          updateSelected={updateSelectedProductProperties}
          updateCheck={updateCheckProductProperties}
          onAddPressed={addProductToOrderDetail}
        />
      </div>
    </div>
  );
}

export default Main;
