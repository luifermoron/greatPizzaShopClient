import axios from 'axios';
import { CATEGORIES, PRODUCTS } from '../constants/Constants';

export const get = async (CATEGORIES) => {
   return axios.get(CATEGORIES);
}


export const fetchAll = async (setCategories, updateAllProducts, updateSelectedProducts) => {
   try {
     const { data: categories } = await get(CATEGORIES);
     const { data: products } = await get(PRODUCTS);
     setCategories([...categories]);
     updateAllProducts(products);
     updateSelectedProducts(products, categories.length > 0 ? categories[0].id : 0);
   } catch (error) {
   }
 }