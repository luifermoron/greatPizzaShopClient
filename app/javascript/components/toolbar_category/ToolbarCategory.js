import React from "react";
import Chip from '@material-ui/core/Chip';
import { MTableToolbar } from 'material-table'

const onSelectCategory = (object, products, updateSelectedProducts) => {
    const id = parseInt(object.target.offsetParent.id);
    if (!isNaN(id))
      updateSelectedProducts(products, id);
}

const ToolbarCategory = (props) => {
    const { categories, products, updateSelectedProducts } = props;
    return (
        <div>
            <MTableToolbar {...props} />
            <div style={{ padding: '0px 10px' }}>
                {
                    categories.map(category => (<Chip id={category.id}
                        label={category.name}
                        color="secondary"
                        style={{ marginRight: 5 }}
                        onClick={(object) => onSelectCategory(object, products.all, updateSelectedProducts)}
                    />))
                }
            </div>
        </div>
    );
}

export default ToolbarCategory;
