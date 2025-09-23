import { Component } from "../common/Component.js";
import { CartList } from "./CartList.js";
import { Footer } from "./Footer.js";
import { Header } from "./Header.js";
import { ProductList } from "./ProductList.js";

export class App extends Component {
  render() {
    const app = document.createElement('div')
    app.className="wrapper"

    app.innerHTML=`
    <div class= "container-xxl">
    <div class="header"></div>
    <main>
      <div class ="cart-list"></div>
      <div class ="prod-modal"></div>
    </main>
    <div class="footer"></div>
    </div>
    `

    //header
    const header = new Header({
      cartContext: this.props.cartContext
    }).render()
    app.querySelector('.header').appendChild(header)

    const cart = new CartList({
      cartContext: this.props.cartContext
    }).render()
    app.querySelector('.cart-list').appendChild(cart)
    app.querySelector('.cart-list').addEventListener('mouseleave',()=>{
      app.querySelector('.cart-list').classList.remove("show")
    })

    const productList = new ProductList({
      cartContext: this.props.cartContext
    })
    productList.mount(app.querySelector('main'))

    const footer = new Footer().render()
    app.querySelector(".footer").appendChild(footer)
    
    return app
  }
}