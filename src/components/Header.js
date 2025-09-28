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
    <div class="d-flex justify-content-between p-3 pt-md-5">
      <div class="d-md-none">
        <div>
          <img src="../public/hamburger-menu.svg" class="mobile-menu"/>
          <a href="/"><img src="../public/logo.svg" class="logo ps-3"/></a>
        </div>
        <div class="mobile-nav">
          <div class="d-flex justify-content-end">
            <img src="../public/close.svg" alt="close icon" class="mobile-nav-close"/>
          </div>
          <ul class="mobile-ul">
          </ul>
        </div>
      </div>
      <div class="d-none d-md-block">
        <div class="d-flex gap-5">
          <a href ="/"><img src="../public/logo.svg" class="logo-desktop"/></a>
          <div class="desktop-nav d-flex gap-3">
          </div>
        </div>
      </div>

      <div class="d-md-none d-flex">
          <div class="mobile-search-container">
            <img src="../public/searchbar.svg" class="search-icon mobile-search-icon"/>
          </div>
        <div class="d-inline-block">
          <img src="../public/cart.svg" class="cart-icon ps-3"/>
          <div class="cart"></div>
        </div>
      </div>

      <div class="d-none d-md-block d-flex justify-content-between">
        <div class="d-flex">
          <div class="search-container d-flex">
            <img src="../public/searchbar.svg" class="search-icon"/>
            <input type="search" name="search" placeholder ="Search for products..." class="desktop-input"/>
          </div>

          <div class="d-inline-block">
            <img src="../public/cart.svg" class="cart-icon ps-3"/>
            <div class="cart"></div>
          </div>
        </div>
      </div>
    </div>
    `

    const menu =["New Arrivals","On Sale"]
    const mobileMenu =["New Arrivals","On Sale","Account", "Help"]

    const mobileNav = header.querySelector(".mobile-nav")
    const ul = header.querySelector("ul.mobile-ul")
    mobileMenu.forEach(item =>{
      const li = document.createElement("li")
      li.innerHTML=`
      <a href ="">${item}</a>
      `
      ul.appendChild(li)
    })
    //Burger menu open/close even
    header.querySelector(".mobile-menu").addEventListener("click", ()=>{
      mobileNav.classList.add("active")
    })
    mobileNav.querySelector(".mobile-nav-close").addEventListener("click", ()=>{
      mobileNav.classList.remove("active")
    })

    //Desktop menu render
    menu.forEach(item=>{
      const div = document.createElement('div')
      div.innerHTML=`
      <a href="/">${item.toUpperCase()}
      </a>
      `
      header.querySelector(".desktop-nav").appendChild(div)
    })

    header.querySelectorAll('.cart-icon').forEach(el=> el.addEventListener("mouseover",()=>{
      if(window.innerWidth >= 768){
      document.querySelector('.cart-list').classList.add("show")
      }
    }))
  
    header.querySelectorAll('.cart-icon').forEach(el=> el.addEventListener("click",()=>{
      if(window.innerWidth < 768){
        document.querySelector('.cart-list').classList.add("show")
      }
    }))
  
    header.querySelectorAll(".cart").forEach(el=>{
      const cartCounter = new CartCounter({
          cartContext: this.props.cartContext
        }).render()
      el.appendChild(cartCounter)
    })
  //header search event listner in productlist in order to access product list

  const desktopInput= header.querySelector(".desktop-input")

  desktopInput.addEventListener("click", (e)=>{
    gsap.to(e.target, {width:"350px"})
  })
    return header
  }
}