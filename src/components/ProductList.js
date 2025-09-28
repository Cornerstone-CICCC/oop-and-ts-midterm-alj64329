import { Component } from "../common/Component.js";
import { Utils } from "../utility/utilis.js";
import { ProductItem } from "./ProductItem.js";
import { Sidebar } from "./Sidebar.js";

export class ProductList extends Component {
  constructor(props){
    super(props)
    this.state ={
      products:[]
    }
    this.categories=[]
  }
  mount(countainer){
    fetch('https://fakestoreapi.com/products')
    .then(res => res.json())
    .then(data =>{
      this.state.products = data
      this.categories = Utils.renderCategory(data)
      countainer.appendChild(this.render())
    })
    .catch(err => console.error(err))
  }

  render() {
    //All data related event listner is in this section
    const mainContainer = document.createElement('div')
    mainContainer.className="main-prod-container"
    mainContainer.innerHTML=`
      <div class="sort-container">
        <div class="d-md-none">
        <img src="../public/filter.svg" alt="Filter icon" class="filter-icon"/>
        </div>
      Sort by: 
        <select class="form-select form-select-sm" id="sort-by">
          <option value=""></option>
          <option value="price-asc">Lowest price</option>
          <option value="price-desc">Highest price</option>
          <option value="rating-asc">Lowet rating</option>
          <option value="rating-desc">Highest rating</option>
        </select>
      </div>
      <div class="sub-prod-container d-md-flex">
      </div>
    `
    const subContainer = mainContainer.querySelector(".sub-prod-container")

    let result =[...this.state.products]

    //sidebar
    const sidebar = new Sidebar(
      this.categories
    ).render()
    subContainer.appendChild(sidebar)

    //mobile filter event listner
    mainContainer.querySelector(".filter-icon").addEventListener("click",()=>{
      sidebar.querySelector('.aside .sidebar-container').classList.add("show")
    })

    // sidebar event listner
    //when it is smaller screen after applying the filter the form will be close
    sidebar.querySelector(".filter-form").addEventListener("submit",(e)=>{
        e.preventDefault()

        if(window.innerWidth<=768){
          sidebar.querySelector('.aside .sidebar-container').classList.remove("show")
        }
        const form = sidebar.querySelector(".filter-form")
        const filter ={
            category:[]
        }

        sidebar.querySelectorAll("input[type='checkbox']:checked").forEach((el)=>{
            filter.category.push(el.value)
        })

        //Price
        const min = sidebar.querySelector('#slider-1').value
        const max = sidebar.querySelector('#slider-2').value


        result = this.state.products.filter(el=> 
          filter.category.includes(el.category) &&(el.price>=min&&el.price<=max))
        const val = mainContainer.querySelector("#sort-by").value.split("-")

        if(!(val.length===1&& val[0]==="")){
          console.log(val)
          result = Utils.sortProducts(result, val)
        }

        this.renderProducts(div, result)

        sidebar.querySelector('#slider-1').value=sidebar.querySelector('#slider-1').min
        sidebar.querySelector('#slider-2').value =sidebar.querySelector('#slider-1').max
        
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });

        Sidebar.resetSlider(sidebar,Utils.value.min,Utils.value.max )


        form.reset()
    })

    const div = document.createElement('div')
    // div.className="products-container d-flex justify-content-center justify-content-md-center flex-wrap gap-3 gap-md-5"
    subContainer.appendChild(div)

    // Header search
    const header =document.querySelector('header')

    const container =header.querySelector(".mobile-search-container")
    const icon =header.querySelector(".mobile-search-icon")

    //Input render only once
    let input = container.querySelector("input[type='search']")
    if(!input){
      input = document.createElement('input')
      input.type="search"
      input.name ="search"
      input.style.display="none"
      input.placeholder="Search for products..."
      container.appendChild(input)
    }

    icon.addEventListener("click",()=>{
      container.className="mobile-search-container search-container active"
      input.style.display ="block";
      input.focus()
    })

    function closeSearchBar(){
      input.style.display ="none"
      container.className="mobile-search-container"
    }

    // click outside of search bar when it is in mobile -> escape
    document.addEventListener("click", (e)=>{
      if(container.classList.contains("active")&&
          !container.contains(e.target)&&
          !icon.contains(e.target)){
            closeSearchBar()
          }
    })

    // search mobile event listner 
    input.addEventListener("keyup",(e)=>{

      if(e.key==="Enter"){ //escape when user type enter
        const query = e.target.value.trim().toLowerCase()
        if(query){
          result = Utils.filterByQuery(query, this.state.products)
          const val = mainContainer.querySelector("#sort-by").value.split("-")

          if(!(val.length===1&& val[0]==="")){
            console.log(val)
            result = Utils.sortProducts(result, val)
          }
          this.renderProducts(div,result)
          e.target.value =''
        }else{
          this.renderProducts(div, this.state.products)
        }
        closeSearchBar()
      }
    })


    //desktop event listner
    header.querySelector("input.desktop-input").addEventListener("keyup",(e)=>{
        if(e.key==="Enter"){ //escape when user type enter
        const query = e.target.value.trim().toLowerCase()
        if(query){
          result = Utils.filterByQuery(query, this.state.products)
          const val = mainContainer.querySelector("#sort-by").value.split("-")

          if(!(val.length===1&& val[0]==="")){
            console.log(val)
            result = Utils.sortProducts(result, val)
          }

          this.renderProducts(div,result)
          e.target.value =''
        }else{
          this.renderProducts(div, this.state.products)
        }
      }
    })

    //sort event
    mainContainer.querySelector('select').addEventListener('change',()=>{
      const val = mainContainer.querySelector("#sort-by").value.split("-")

      const sortedProducts = Utils.sortProducts(result, val)

      this.renderProducts(div,sortedProducts)

      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    })


    this.renderProducts(div,this.state.products)
    
    return mainContainer
  }

  renderProducts(container, products){
    container.innerHTML=""

    if(products.length===0){
      const div = document.createElement('div')
      div.className="text-uppercase prod-none-heading"
      div.textContent="No Result"
      container.appendChild(div)
    }else{
      const div = document.createElement("div")
      div.innerHTML=`
      <div class="render-results">${products.length} Results showing</div>
      <div class="products-container d-flex justify-content-center justify-content-md-center flex-wrap gap-3 gap-md-5">
      </div>
      `

      container.appendChild(div)
      products.forEach(item=>{
        const productItem = new ProductItem({
          item,
          cartContext: this.props.cartContext
        }).render()

        div.querySelector(".products-container").appendChild(productItem)
      })

      
    }
  }

}