import { Component } from "../common/Component.js";
import { CartCounter } from "./CartCounter.js";

export class Header extends Component {
    constructor(props){
    super(props)
  }

  render() {
    const header = document.createElement('header')
    header.className="container-xxl"

    header.innerHTML=`
    <div class="mobile-header d-flex justify-content-between p-3">
      <div class="d-md-none">
        <img src="../public/hamburger-menu.svg" class="menu"/>
        <img src="../public/logo.svg" class="logo ps-3"/>
      </div>
      <div class="d-none d-md-block">
        <img src="../public/hamburger-menu.svg" class="menu"/>
        <img src="../public/logo.svg" class="logo ps-3"/>
      </div>

      <div>
        <img src="../public/searchbar.svg" class="search-icon"/>
        <div class="d-inline-block">
          <img src="../public/cart.svg" class="cart-icon ps-3"/>
          <div class="cart">
          </div>
        </div>
      </div>    
    </div>
    `

    header.querySelector('.cart-icon').addEventListener("mouseover",()=>{
      document.querySelector('.cart-list').classList.add("show")
    })
    const cartCounter = new CartCounter({
      cartContext: this.props.cartContext
    }).render()

    header.querySelector(".cart").appendChild(cartCounter)


    return header
  }
}