import React, { useState, useEffect } from "react";

const productsByCategoryId = (products, id) => {
    if (id === 0) return [];

    return clearChecks(products.filter(product => {
        const { categories } = product;
        return categories.some(category => category.id === id)
    }), 0);
}

const clearChecks = (products, id) => {
    return products.map(product => { return { ...product, tableData: { checked: product.id === id ? true : false } } });
}

export const useProducts = () => {
    const [products, updateProducts] = useState({ all: [], selected: [] });

    const updateAllProducts = (products) => {
        updateProducts({ all: [...products], selected: [] });
    }

    const updateSelectedProducts = (all, categoryId) => {
        updateProducts({ all: [...all], selected: productsByCategoryId(all, categoryId) });
    }

    const updateCheckProducts = (product) => {
        updateProducts({ all: products.all, selected: clearChecks(products.selected, product.id) });
    }

    return { products, updateAllProducts, updateSelectedProducts, updateCheckProducts };
}