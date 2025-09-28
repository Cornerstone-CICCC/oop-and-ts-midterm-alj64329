import { Component } from "../common/Component.js";

export class Footer extends Component {
  render() {
    const footer = document.createElement('footer')

    footer.innerHTML=`
    <div class="d-flex flex-column justify-content-center gap-4 p-3">

      <div class="d-flex flex-column flex-md-row justify-content-md-between">
        <div class="d-flex flex-column justify-content-center gap-4">
          <img src="../public/logo.svg" alt="logo" class="footer-logo"/>

          <div class="social-media-icons">
            <img src="../public/x-logo.svg" alt="X Logo"/>
            <img src="../public/facebook-logo.svg" alt="Facebook Logo"/>
            <img src="../public/instagram-logo.svg" alt="Instagram Logo"/>
          </div>
        </div>

        <div class="accordion d-md-none">
        </div>

        <div class="d-none d-md-block">
          <div class="desktop-nav d-flex"></div>
        </div>
      </div>

      <div class="border"></div>
      <div class="copyright-text">CartIn &copy; 2025, All Right Reserved</div>
    </div>
    `
  //  Render accordion elements
    const company =["About","Features","News","Career","Event"]
    const myAccount =["Account", "Order Status","Purchase History"]
    const help =["Customer Support", "Return & Exchange","Shipping","Billing"]

    const accordionItems={
      company:company,
      account:myAccount,
      help:help
    }

    for(const [key, value] of Object.entries(accordionItems)) {
      const accordionElement= document.createElement('div')
      accordionElement.className="accordion-item"

      accordionElement.innerHTML=`
      <h2 class ="accordion-header">
          <button class ="accordion-button collapsed" type="button" data-bs-toggle ="collapse" aria-expanded="false">
              ${key.toUpperCase()}
          </button>
      </h2>
      `
      accordionElement.querySelector("button").setAttribute("aria-controls",`collapse-${key}`)
      const accordionCollapse = document.createElement('div')
      accordionCollapse.className="accordion-collapse collapse"
      accordionCollapse.id = `collapse-${key}`
      accordionElement.appendChild(accordionCollapse)
      footer.querySelector(".accordion").appendChild(accordionElement)

      value.forEach(text=>{
        const div = document.createElement('div')
        div.className="accordion-body"
        div.textContent = text
        accordionCollapse.appendChild(div)
      })
    }

    //Event listner
    footer.querySelectorAll(".accordion-button").forEach(element=>{
      element.addEventListener('click',(e)=>{
        const id = e.target.getAttribute("aria-controls")
        const collapse = footer.querySelector(`#${id}`)
        const isExplanded = e.target.getAttribute("aria-expanded") === "true"

        footer.querySelectorAll(".accordion-collapse").forEach(el=>{
          el.classList.remove("show")
        })

        footer.querySelectorAll(".accordion-button").forEach(el =>{
          el.classList.add("collapsed")
          el.setAttribute("aria-expanded", "false")
        })

        if(!isExplanded){
          e.target.setAttribute("aria-expanded","true")
          e.target.classList.remove("collapsed")
          collapse.classList.add("show")
          console.log(collapse.classList)
        }
    })})

    //Desktop nav render
    for(const [key, value] of Object.entries(accordionItems)) {
      const div = document.createElement('div')
      div.className = "footer-nav-item"
      div.innerHTML=`
      <div class="fw-bold">${key.toUpperCase()}</div>
      `
      const ul =document.createElement("ul")
      div.append(ul)

      value.forEach(item =>{
        const li = document.createElement("li")
        li.textContent= item
        ul.appendChild(li)
      })
      footer.querySelector(".desktop-nav").appendChild(div)

    }


    return footer
  }
}