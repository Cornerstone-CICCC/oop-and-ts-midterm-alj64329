import { Component } from "../common/Component.js";

export class ProductModal extends Component {
  constructor(props){
    super(props)
  }

  handleAddToCart(quantity){
    this.props.cartContext.addProduct(this.props.item, quantity)
  }

  render() {
    const modal = document.createElement('div')
    modal.className="prod-modal-content"
    console.log(this.props)

    modal.innerHTML=`
    <div class="modal-box">
        <div>
            <div class="d-flex justify-content-end"><img src="../public/close.svg" alt="close icon" class="close-icon"/></div>
            <div class="d-flex gap-5 ">
                <div class="img-container">
                    <img src="${this.props.item.image}" class="product-img"/>
                </div>
                <div class="d-flex flex-column moda-right gap-3">
                    <div><span class="item-title">${this.props.item.title}</span></div>
                    <div>${this.props.item.rating.rate}</div>
                    <div>$ ${this.props.item.price.toFixed(2)}</div>

                    <div class="d-flex flex-column justify-content-center py-2">
                        <div class="modal-prod-qty d-flex">
                            <button type="button" class="reduce-qty-btn">-</button>
                            <div class="order-qty">1</div>
                            <button type="button" class="increase-qty-btn">+</button>
                        </div>
                        <button type="button" class="add-cart-btn text-uppercase btn btn-dark btn-sm my-4">add to cart</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    // Close
    modal.querySelector('.close-icon').addEventListener('click', ()=>{
        document.querySelector(".prod-modal").classList.remove("modal-active")
    })
    // quantity
    modal.querySelector('.reduce-qty-btn').addEventListener('click',()=>{
        let qtyReduced = parseInt(modal.querySelector(".order-qty").textContent)-1
        qtyReduced=`${qtyReduced>1?qtyReduced: 1}`
        modal.querySelector(".order-qty").textContent = qtyReduced
    })

    modal.querySelector('.increase-qty-btn').addEventListener('click',()=>{
        const qtyAdded = parseInt(modal.querySelector(".order-qty").textContent)+1
        modal.querySelector(".order-qty").textContent = qtyAdded
    })
    // place order
    modal.querySelector('.add-cart-btn').addEventListener('click',()=>{
        const orderQty=modal.querySelector(".order-qty").textContent
        this.handleAddToCart(orderQty)
        document.querySelector(".prod-modal").classList.remove("modal-active")
    })

    return modal
  }
}