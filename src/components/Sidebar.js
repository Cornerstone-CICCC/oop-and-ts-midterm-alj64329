import { Component } from "../common/Component.js";
import { Utils } from "../utility/utilis.js";

export class Sidebar extends Component{
    constructor(props){
        super(props)
        this.categories = this.props
    }
    render(){
        const aside = document.createElement('div')
        aside.className="aside"

        aside.innerHTML=`
        <div class="sidebar-container">
            <div class="d-md-none d-flex justify-content-end">
                <img src="../public/close.svg" alt="close icon" class="close-icon">
            </div>
            <div class="d-flex justify-content-between pb-3">
                <div class="text-uppercase fw-bold">Filters</div>
                <img src="../public/filter.svg" class="d-none d-md-block"/>
            </div>
            <div class="border"></div>
            <form class="filter-form">
                <div class="category-form"></div>
                <div class="border"></div>
                <div>
                    <div class="text-uppercase fw-bold pt-3">Price</div>
                    <div class="value-container d-flex justify-content-between pt-4">
                        <span id="range1"></span>
                        <span id="range2"></span>
                    </div> 
                    <div class="slider-container">
                        <div class="range-slider">
                            <div class="slider-track"></div>
                            <input type="range" min="${Utils.value.min}" max="${Utils.value.max}" value="${Utils.value.min}" id="slider-1" >
                            <input type="range" min="${Utils.value.min}" max="${Utils.value.max}" value="${Utils.value.max}" id="slider-2" >
                        </div>
                    </div>
                </div>
                    <div class="d-flex justify-content-center py-2">
                        <button type="submit" class="apply-btn tw-bold text-uppercase btn btn-dark btn-sm px-5">Apply filter</button>
                    </div>
            </form>
        </div>
        `
    //double slider 
    const slider1 = aside.querySelector("#slider-1")
    const slider2 = aside.querySelector("#slider-2")
    let slider1Val = slider1.value
    let slider2Val = slider2.value

    this.sliderOne(aside,slider1Val, slider2Val)
    this.sliderTwo(aside,slider1Val, slider2Val)

    slider1.addEventListener("input", ()=> {
        slider1Val = slider1.value
        this.sliderOne(aside,slider1Val, slider2Val)
    })
    slider2.addEventListener("input", ()=> {
        slider2Val = slider2.value
        this.sliderTwo(aside, slider1Val, slider2Val)
    })

    this.categories.map(category=>{
        const div = document.createElement('div')
        div.className="d-flex gap-3 py-2"
        div.innerHTML=`
        <input type="checkbox" id="${category}" name="${category}" value="${category}">
        <label for= "${category}">${category.toUpperCase()}</label>
        `
        aside.querySelector(".category-form").appendChild(div)
    })

    // All checkbox render
    const checkAllDiv = document.createElement('div')
    checkAllDiv.className="d-flex gap-3 py-2"
    checkAllDiv.innerHTML=`
        <input type="checkbox" id="all-category" name="all-category" value="all-category">
        <label for= "all-category" class="text-uppercase">See All Categories</label>
        `
    aside.querySelector(".category-form").appendChild(checkAllDiv)

    checkAllDiv.querySelector('input[id="all-category"]').addEventListener('change',()=>{
       aside.querySelectorAll("input[type='checkbox']").forEach(input=>{
        input.checked = true
       })
    })

    aside.querySelector(".close-icon").addEventListener("click", ()=>{
        aside.querySelector(".sidebar-container").classList.remove("show")
    })

    return aside

    }

    sliderOne(container, slider1Val, slider2Val){
        const displayValOne = container.querySelector("#range1")
        const minGap = 10
        if(parseInt(slider2Val)-parseInt(slider1Val)<=minGap){
            slider1Val = parseInt(slider2Val) - minGap
        }
        displayValOne.textContent= `$ ${slider1Val}`
        this.fillColor(container, slider1Val, slider2Val)
    }

    sliderTwo(container,slider1Val, slider2Val){
        const displayValTwo = container.querySelector("#range2")
        const minGap = 10
        if(parseInt(slider2Val)-parseInt(slider1Val)<=minGap){
            slider2Val = parseInt(slider1Val) + minGap
        }
        displayValTwo.textContent= `$ ${slider2Val}`
        this.fillColor(container, slider1Val, slider2Val)
    }

    fillColor(container,slider1Val, slider2Val){
        const sliderTrack = container.querySelector(".slider-track")
        const sliderMaxValue = Utils.value.max
        let percent1 = (slider1Val / sliderMaxValue) * 100
        let percent2 = (slider2Val / sliderMaxValue) * 100
        sliderTrack.style.left = `${percent1}%`
        sliderTrack.style.width = `${percent2-percent1}%`
        sliderTrack.style.backgroundColor = `black`
    }

    static resetSlider(container, value1, value2){
        const instance = new this()
        instance.sliderOne(container, value1, value2)
        instance.sliderTwo(container, value1,value2)
    }
}