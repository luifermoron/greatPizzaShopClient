// API
export const BASE_URL = "http://localhost:8000/api";
export const API_VERSION = BASE_URL + "/v1";
export const PRODUCTS = API_VERSION + "/products/";
export const PRODUCT_PROPERTIES = API_VERSION + "/product_properties/";
export const CATEGORIES = API_VERSION + "/categories/";
export const PROCESS_ORDER = API_VERSION + "/orders/";


export const MENU_TITLE = "1) Select a product,then customize it";
export const MENU_CHIP_ID = "id";
export const MENU_CHIP_COLOR = "primary";
export const MENU_CHIP_LABEL_NAME = "name";
export const MENU_COLUMNS = [
    { title: 'Id', field: 'id' },
    { title: 'Name', field: 'name' },
    { title: 'Description', field: 'description' },
];

export const PRODUCT_CUSTOMIZATION_MENU_TITLE = "2) Customize your product";
export const PRODUCT_CUSTOMIZATION_CHIP_ID = "type_property";
export const PRODUCT_CUSTOMIZATION_CHIP_COLOR = "secondary";
export const PRODUCT_CUSTOMIZATION_CHIP_LABEL_NAME = "type_property";
export const PRODUCT_CUSTOMIZATION_COLUMNS = [
    { title: 'Id', field: 'id' },
    { title: 'Name', field: 'label' },
    { title: 'Extra', field: 'value' },
];
