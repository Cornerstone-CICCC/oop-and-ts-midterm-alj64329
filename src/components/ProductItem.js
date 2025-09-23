import { Component } from "../common/Component.js";
import { Utils } from "../utility/utilis.js";
import { ProductModal } from "./ProductModal.js";

export class ProductItem extends Component {
  constructor(props){
    super(props)
  }

  handleAddToCart(){
    this.props.cartContext.addProduct(this.props.item)
  }

  render() {
    const itemDiv = document.createElement('div')
    itemDiv.className="item-container"

    itemDiv.innerHTML=`
    <div class="img-container">
      <img src="${this.props.item.image}" class="product-img"/>
    </div>
    <div class="d-flex flex-column">
      <div><span class="item-title">${this.props.item.title}</span></div>
      <div class="d-flex rating-box">
        <div class="rating"></div>
        ${this.props.item.rating.rate}
      </div>
      <div class="fw-bold">$ ${this.props.item.price.toFixed(2)}</div>

      <div class="d-flex justify-content-center py-2">
        <button type="button" class="add-cart-btn text-uppercase btn btn-dark btn-sm">add to cart</button>
      </div>
    </div>
    `

    //render star
    const element = itemDiv.querySelector(".rating")
    Utils.starRender(element,this.props.item.rating.rate)

    //Modal show
    itemDiv.addEventListener('click',()=>{
      document.querySelector(".prod-modal").classList.add("modal-active")
      document.querySelector(".prod-modal").innerHTML=""
      const modal = new ProductModal({
        item:this.props.item,
        cartContext: this.props.cartContext
      }).render()

      document.querySelector(".prod-modal").appendChild(modal)
    })

    itemDiv.querySelector('.add-cart-btn').addEventListener('click',()=>this.handleAddToCart())
    return itemDiv
  }
}