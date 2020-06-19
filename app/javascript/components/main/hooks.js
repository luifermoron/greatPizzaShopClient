import React, { useState, useEffect } from "react";

export const filterByCategoryID = (items, id) => {
    if (isNaN(id)) return undefined;

    if (id === 0) return [];

    return items.filter(item => {
        const { categories } = item;
        return categories.some(category => category.id === id)
    });
}

export const filterByTypeProperty = (items, type_property) => {
    if (type_property === 0) return [];
    return items.filter(item => item.type_property === type_property);
}

const unCheck = (items) => {
    return items.map(item => { return { ...item, tableData: { checked: false } } });
}

const clearChecksExceptBy = (items, id) => {
    return items.map(item => { return { ...item, tableData: { checked: item.id === id ? true : false } } });
}


export const useOrders = () => {
    const [orders, setOrders] = useState([]);

    const addOrder = (object) => {
        setOrders([...orders, object]);
    }
    
    const reInitOrder = () => {
        setOrders([]);
    }
    return { orders, addOrder, reInitOrder };
}

export const useItems = (filterByFunction, multipleSelection = true) => {
    const [items, updateItems] = useState({ all: [], selected: [] });

    const updateAll = (items) => {
        updateItems({ all: [...items], selected: [] });
    }

    const updateSelected = (all, categoryId) => {
        const filteredItems = filterByFunction(all, categoryId);
        if (filteredItems)
            updateItems({ all: [...all], selected: multipleSelection ? clearChecksExceptBy(filteredItems, 0) : filteredItems });
    }

    const updateCheck = (item) => {
        updateItems({ all: items.all, selected: multipleSelection ? clearChecksExceptBy(items.selected, item.id) : items.selected });
    }

    const unCheckAll = () => {
        updateItems({ all: unCheck(items.all), selected: unCheck(items.selected) });
    }

    return { items, updateAll, updateSelected, updateCheck, unCheckAll };
}