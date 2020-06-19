import axios from 'axios';
import { CATEGORIES, PRODUCTS, PRODUCT_PROPERTIES, PROCESS_ORDER } from '../constants/Constants';

export const get = async (CATEGORIES) => {
  return axios.get(CATEGORIES);
}

export const simulateOrderProcess = async (orderId) => {
  return axios.get(PROCESS_ORDER + orderId);
}

export const fetchAll = async (setCategories,
  updateAllProducts,
  updateSelectedProducts,

  setTypeProperties,
  updateAllProductProperties,
  updateSelectedProductProperties,
) => {
  try {
    const { data: categories } = await get(CATEGORIES);
    const { data: products } = await get(PRODUCTS);
    const { data: product_properties } = await get(PRODUCT_PROPERTIES);
    setCategories([...categories]);
    updateAllProducts(products);
    updateSelectedProducts(products, categories.length > 0 ? categories[0].id : 0);

    const typeProperties = [...new Map(product_properties.map(productProperty => [productProperty['type_property'], productProperty])).values()];
    setTypeProperties(typeProperties);
    updateAllProductProperties(product_properties);
    updateSelectedProductProperties(product_properties, typeProperties.length > 0 ? typeProperties[0].type_property : 0);
  } catch (error) {
  }
}


export const createOrder = async (orders) => {
  const data = {
    orders: orders,
    address: "Mutualista Avenue" //to-do: make: editable
  }

  try {
    const order = await axios.post(PROCESS_ORDER, data);
    return order;
  } catch (error) {
  }
  return undefined;
}