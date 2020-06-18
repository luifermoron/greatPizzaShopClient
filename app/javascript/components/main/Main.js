import React, { useState, useEffect, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import MaterialTable, { MTableToolbar } from 'material-table'
import AddBox from "@material-ui/icons/AddBox";

import ToolbarCategory from "../../components/toolbar_category/ToolbarCategory";
import Menu from "../../components/menu/Menu";

import { fetchAll } from "../../api/api";
import { useProducts } from "../main/hooks";

const Main = () => {
  const [categories, setCategories] = useState([]);
  const { products, updateAllProducts, updateSelectedProducts, updateCheckProducts } = useProducts();

  useEffect(() => { fetchAll(setCategories, updateAllProducts, updateSelectedProducts); }, []);

  return (
    <div style={{ display: 'flex', flex: 1, maxWidth: "100%", height: 1000, backgroundColor: 'blue' }} >
      <Menu
        categories={categories}
        products={products}
        updateSelectedProducts={updateSelectedProducts}
        updateCheckProducts={updateCheckProducts}
      />
    </div>
  );
}

export default Main;
