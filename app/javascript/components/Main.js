import React from "react"
import PropTypes from "prop-types"
import axios from 'axios';

const BASE_URL = "http://localhost:8000/api/v1"
const PRODUCTS = BASE_URL + "/products/"
const PROCESS_ORDER = BASE_URL + "/orders/"

class Main extends React.Component {

  state = {
    order_state: "unverifed",
    print: ""
  }


  print_products = (products) => {
    let result = "";
    products.forEach(product => {
      result += "Name: " + product.name + " <br/>";
    });
    return result;
  }

  select_quantity = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  simulate_order = () => {
    const { products, print } = this.state;
    var product = products[Math.floor(Math.random() * products.length)];
    var quantity = this.select_quantity(1, 5);

    const data = {
      product_id: product.id,
      product_name: product.name,
      quantity: quantity,
      address: "Mutualista Street"
    }

    const order = "**Order is: <br/>" +
      "****Product: " + data.product_name + " <br/>" +
      "****Quantity: " + data.quantity + " <br/>" +
      "****Address: " + data.address + " <br/>";
    this.setState({ print: print + order });

    axios.post(PROCESS_ORDER, data)
      .then(res => {
        const { print } = this.state;
        this.setState({ print: print + res.data });
      })
  }

  componentDidMount() {
    axios.get(PRODUCTS)
      .then(res => {
        const print = "TODO: BUILD A REAL CLIENTS SIMULATOR: <br/>" + 
                      "Product list: <br/>" + this.print_products(res.data);
        this.setState({ print: print, products: res.data }, this.simulate_order);
      });
  }

  render() {

    return (
      <div style={{ display: 'flex', flex: 1, width: '100%', height: 900, }} >
        <p style={{ display: 'flex', flex: 1, width: '100%', }}
          dangerouslySetInnerHTML={{ __html: this.state.print }} >
        </p>
      </div>
    );
  }
}

export default Main
