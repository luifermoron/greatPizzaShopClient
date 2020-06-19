# Great Pizza Client
React-rails client.
# Table of Contents
1. Assumption
2. Installation
3. State Order Process: how it works
4. Components description
5. Customize products

## Assumption
-   Client can customize his products as he wants.
-   Because no specified, Orders are always delivered as a final state.
-   Order process is a simulation.
-   New Categories and products can only be created by admins(from seeders now, but in future a admin panel side can be implemented). In the other hand, products can be customizes by clients. For example: A client can ask for small size without cheese of Hawaiian pizza, but he/she cannot create a new kind of pizza or he/she cannot create a new category or even link the pizza to some category.

## Installation
important: RUN THE BACKEND FIRST.
```
bundle install
yarn install
rails s
```
## State Order Process: how it works
Lets suppose a client ask for the next order:
| Product         | Properties                       | Quantity |
|-----------------|----------------------------------|----------|
| Hawaiian Pizza  | Small size, thin crust, 'llajua' | 4        |
| Brazilian Pizza | Big size, cheese, some random topping | 3        |
| Salads          | Medium size                         | 5        |



Everytime the client asks for the state of its order, the order has the next behavior:
    1) The 4 Hawaiian pizzas are prepared, baked, cutted, boxed everytime the client asks for his order. When 4 hawaiian pizzas are boxed, they wait for the next products.
    2) The first process is repeated until all products are boxed.
    3) When all products are boxed, they change to: Delivering state.
    4) Finally, all products are with client, the products change to: Delivered state.
## Components description
All components are function component that uses the power of react-hooks
#### Main component:
Main component has the next states:
    -   orders: Client order as shown in state order process.
    -   categories: Categories fetched from backend.
    -   products: Products fetched from backend. uses useItems.
    -   productProperties: productProperties fetched from backend. uses useItems.
    -   typeProperties: Built from productProperties based on 'type_property' field.
    -   editingProduct: Current editing customizing product.
    -   editingQuantity: Current editing customizing quantity of current product.
    -   print: simple string for output order state.

The main component re-uses the useItems hook for many states.
##### How useItems hook works:
*   useItems has items state which has all and selected arrays.
*   You can choose to allow multipleSelection. default: true.
*   all array is all the items fetched from backend
*   selected array is the selected array from all under some circunstances.
*   useItems has the next methods:
    *   updateAll: update all array only.
    *   updateSelected: update selected array only.
    *   updateCheck: if multiple selection is false, the item parameter will be selected and the others un-select else, multiple selection will be allow.
    *   unCheckAll: unselect all items.

#### SelectableChipTable component:
This is a selectable table with a toolbar that contains chips. Every time you select a Chip, the content of the table changes. 
You can also selected rows of the table, and actions could be or not provided.
Labels, title and colors can also be customized.

## Customize products
The client can add product properties which will be added to the default product properties provided by admin. Also the product can have quantities.