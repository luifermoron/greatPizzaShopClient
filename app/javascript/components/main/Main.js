import React, { useState, useEffect } from "react";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddBox from "@material-ui/icons/AddBox";


import SelectableChipTable from "../selectable_chip_table/SelectableChipTable";


import { MENU_TITLE, MENU_CHIP_ID, MENU_CHIP_LABEL_NAME, MENU_CHIP_COLOR, MENU_COLUMNS } from "../../constants/Constants";
import { PRODUCT_CUSTOMIZATION_MENU_TITLE, PRODUCT_CUSTOMIZATION_CHIP_ID, PRODUCT_CUSTOMIZATION_CHIP_LABEL_NAME, PRODUCT_CUSTOMIZATION_CHIP_COLOR, PRODUCT_CUSTOMIZATION_COLUMNS } from "../../constants/Constants";

import { fetchAll } from "../../api/api";
import { orderProcess } from "../../simulator/simulator";
import { useItems, useOrders, filterByCategoryID, filterByTypeProperty } from "../main/hooks";
import { container, column, row } from "./styles";


const customizeProduct = (evt, products, setEditingProduct) => {
  if (products.length > 0)
    setEditingProduct(products[0]);
}

const addProductToOrderDetail = (editingProduct, editingQuantity, allProductProperties, addOrder, reInit) => {
  if (editingProduct.id && editingQuantity > 0) {
    const selectedProductProperties = allProductProperties.filter(p => p.tableData && p.tableData.checked);
    
    addOrder({
      product: {
        name: editingProduct.name,
        product_type: editingProduct.product_type,
        properties: selectedProductProperties,
      },
      quantity: editingQuantity
    });
    reInit();
  }
}

const Main = () => {
  const { orders, addOrder, reInitOrder } = useOrders([]);
  const [editingProduct, setEditingProduct] = useState({});
  const [editingQuantity, setEditingQuantity] = useState(1);
  const [categories, setCategories] = useState([]);
  const [typeProperties, setTypeProperties] = useState([]);

  const [print, setPrint] = useState("");

  const { items: products,
    updateAll: updateAllProducts,
    updateSelected: updateSelectedProducts,
    updateCheck: updateCheckProducts,
    unCheckAll: unCheckProducts,
  } = useItems(filterByCategoryID);

  const { items: productProperties,
    updateAll: updateAllProductProperties,
    updateSelected: updateSelectedProductProperties,
    updateCheck: updateCheckProductProperties,
    unCheckAll: unCheckProductProperties,
  } = useItems(filterByTypeProperty, false);


  const reInit = () => {
    setEditingQuantity(1);
    setEditingProduct({});
    setPrint("");
    unCheckProducts();
    unCheckProductProperties();
  }

  useEffect(() => {
    fetchAll(setCategories, updateAllProducts, updateSelectedProducts,
      setTypeProperties, updateAllProductProperties, updateSelectedProductProperties);
  }, []);

  return (
    <div style={container}>
      <div style={column}>
        <h2>Menu: </h2>
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
          actions={
            [
              {
                  tooltip: 'Add',
                  icon: () => <AddBox />,
                  onClick: (evt, products) => 
                  {
                    updateSelectedProductProperties(productProperties.all, typeProperties.length > 0 ? typeProperties[0].type_property : 0);
                    customizeProduct(evt, products, setEditingProduct)
                  }
              }
          ]}
        />
        {
          editingProduct.name &&
          (
            <div style={row}>
              <SelectableChipTable
                title={PRODUCT_CUSTOMIZATION_MENU_TITLE}
                columns={PRODUCT_CUSTOMIZATION_COLUMNS}
                chipId={PRODUCT_CUSTOMIZATION_CHIP_ID}
                chipLabelName={PRODUCT_CUSTOMIZATION_CHIP_LABEL_NAME}
                chipColor={PRODUCT_CUSTOMIZATION_CHIP_COLOR}
                categories={typeProperties}
                items={productProperties}
                updateSelected={updateSelectedProductProperties}
                updateCheck={updateCheckProductProperties}
              />
              <div style={column}>
                <h3>Product name: {editingProduct.name || 'NO PRODUCT SELECTED'} </h3>
                <div style={row}>
                  <p>Quantity: </p>
                  <TextField
                    variant="outlined"
                    size="small"
                    type="number"
                    value={editingQuantity}
                    onChange={(object) => setEditingQuantity(object.target.value)}
                  />
                </div>
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => 
                    {
                      addProductToOrderDetail(editingProduct, editingQuantity, productProperties.all,
                    addOrder, reInit);}}
                > Add product to Store</Button>
              </div>
            </div>
          )
        }
      </div>
      <div style={column}>
        <h2>Order detail: </h2>
        <ul>
          {
            orders.map(order => {
              return (<li>{order.product.name}
                <ul>
                  <li>Quantity: {order.quantity}</li>
                  <li>Product Properties: {order.product.properties.map(p => p.label).join(",")} </li>
                </ul>
              </li>)
            })
          }
        </ul>
        <Button
          variant="contained"
          color="primary"
          size="big"
          onClick={() => orderProcess(orders, reInitOrder, setPrint)}
        > ORDER NOW</Button>
        <p  dangerouslySetInnerHTML={{ __html: print }}></p>
      </div>
    </div>
  );
}

export default Main;
