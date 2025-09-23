import { Component } from "../common/Component.js";
import { CartItem } from "./CartItem.js";

export class CartList extends Component {
  constructor(props){
    super(props)
    this.state ={
      cart:[]
    }
    this.updateCart = this.updateCart.bind(this)
    this.props.cartContext.subscribe(this.updateCart)
    this.productListElement = null
  }

  updateCart(cart){
    this.state.cart =cart
    this.cartHeadElement.textContent = cart.length===0?"Your cart is empty":"Cart Item"
    this.productListElement.innerHTML =""
    const div = document.createElement('div')
    this.state.cart.forEach(product =>{
      const cartItem = new CartItem({
        product,
        cartContext: this.props.cartContext
      }).render()
      div.appendChild(cartItem)
    })
    this.productListElement.appendChild(div)

    const subtotal= this.state.cart.reduce((acc,cur)=>acc+(cur.quantity*cur.price),0)

    const summaryDiv = document.createElement('div')
    summaryDiv.className="d-flex flex-column justify-content-center"
    summaryDiv.innerHTML=`
    <div class="summary-head">order Summary</div>
    <div class="d-flex justify-content-between">
      <span>Subtotal</span><span>$ ${subtotal.toFixed(2)}</span>
    </div>
    <button class="checkout-btn">Checkout</button>
    `
    this.productListElement.appendChild(summaryDiv)
  }

  render() {
    const cartElement = document.createElement('div')
    cartElement.className="cart-popup"

    cartElement.innerHTML = `
    <div class="cart-heading">Your cart is empty</div>
    <ul class="cart-items"></ul>
    `
    this.productListElement = cartElement.querySelector('.cart-items')
    this.cartHeadElement = cartElement.querySelector('.cart-heading')

    const initialCart = this.props.cartContext.getCart()
    if(initialCart.length > 0){
      this.updateCart(initialCart)
    }

    return cartElement
  }
}