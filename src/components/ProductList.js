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
    const mainContainer = document.createElement('div')
    mainContainer.className="main-prod-container"
    mainContainer.innerHTML=`
      <div class="sort-container">
      Sort by: 
        <select class="form-select form-select-sm" id="sort-by">
          <option value=""></option>
          <option value="price-asc">Lowest price</option>
          <option value="price-desc">Highest price</option>
          <option value="rating-asc">Lowet rating</option>
          <option value="rating-desc">Highest rating</option>
        </select>
      </div>
    `

    const div = document.createElement('div')
    div.className="products-container d-flex justify-content-center flex-wrap gap-3 gap-md-5 px-2 px-md-5"
    mainContainer.appendChild(div)

    mainContainer.querySelector('select').addEventListener('change',()=>{
      const val = mainContainer.querySelector("#sort-by").value.split("-")
      console.log(val)
      const option = val[0]
      const orderBy = val[1]
      let sortedProducts = null

      if(option === "rating"){
        if(orderBy === "asc"){
          sortedProducts = this.state.products.toSorted((a,b)=>a[option]["rate"] - b[option]["rate"])
        }else{
          sortedProducts = this.state.products.toSorted((a,b)=>b[option]["rate"] - a[option]["rate"])
        }
      }else{
        if(orderBy === "asc"){
          sortedProducts = this.state.products.toSorted((a,b)=>a[option] - b[option])
        }else{
          sortedProducts = this.state.products.toSorted((a,b)=>b[option] - a[option])
        }
      }

      renderProducts(sortedProducts)
    })

    //create item-container 

    const renderProducts = (products)=>{
      div.innerHTML=""
      products.forEach(item =>{
        console.log(item)
        const productItem = new ProductItem({
          item,
          cartContext: this.props.cartContext
        }).render()

        div.appendChild(productItem)
      })
    }

    renderProducts(this.state.products)
    
    return mainContainer
  }
}