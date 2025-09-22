import { Component } from "../common/Component.js";

export class CartItem extends Component {
  constructor(props){
    super(props)
  }

  handleRemove(){
    this.props.cartContext.removeProduct(this.props.product)
  }
  handleDecrease(){
    this.props.cartContext.decreaseProduct(this.props.product)
  }

  handleIncrease(){
      this.props.cartContext.addProduct(this.props.product)
  }
  render() {
    const li = document.createElement('li')
    li.className="d-flex cart-item-box"
    li.innerHTML =`
    <div class="cart-img-container">
      <img src="${this.props.product.image}" class="cart-prod-img"/>
    </div>
    <div class="cart-right-box">
      <div class="cart-top-text d-flex justify-content-between">
        <div class="cart-item-title">${this.props.product.title}</div>
        <button type="button" class="delete-item-btn"><img src="../public/trashcan.svg" alt="delete"></button>
      </div>
      <div class="d-flex justify-content-between">
        <div class="cart-prod-price">$ ${this.props.product.price.toFixed(2)}</div>
        <div class="cart-prod-qty d-flex">
          <button type="button" class="reduce-qty-btn">-</button>
          <div>${this.props.product.quantity}</div>
          <button type="button" class="increase-qty-btn">+</button>
        </div>
      </div>
    </div>`

    li.querySelector(".delete-item-btn").addEventListener('click',()=>this.handleRemove())
    li.querySelector(".reduce-qty-btn").addEventListener('click',()=>this.handleDecrease())
    li.querySelector(".increase-qty-btn").addEventListener('click',()=>this.handleIncrease())

    return li
    
  }
}