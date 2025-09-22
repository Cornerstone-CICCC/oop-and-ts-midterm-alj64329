import { Component } from "../common/Component.js";
import { ProductItem } from "./ProductItem.js";
import { ProductModal } from "./ProductModal.js";

export class ProductList extends Component {
  constructor(props){
    super(props)
    this.state ={
      products:[]
    }
  }
  mount(countainer){
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data =>{
      this.state.products = data
      countainer.appendChild(this.render())
    })
    .catch(err => console.error(err))
  }

  render() {
    const div = document.createElement('div')
    div.className="products-container d-flex justify-content-center flex-wrap gap-3 gap-md-5 px-2"

    //create item-container 
    this.state.products.forEach(item =>{
      const productItem = new ProductItem({
        item,
        cartContext: this.props.cartContext
      }).render()

      div.appendChild(productItem)
    })
    
    return div
  }
}