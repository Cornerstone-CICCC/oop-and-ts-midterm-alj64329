import { Component } from "../common/Component.js";

export class CartCounter extends Component{
    constructor(props){
        super(props)
        this.state ={
            cart: []
        }
        this.updateCounter = this.updateCounter.bind(this)
        this.props.cartContext.subscribe(this.updateCounter)
        this.counterElement = null
    }

    updateCounter(cart){
        this.state.cart = cart
        this.counterElement.innerHTML = this.state.cart.reduce((total, acc)=> total +acc.quantity,0)
    }

    render(){
        const counter = document.createElement('span')

        this.counterElement = counter

        const initialCart = this.props.cartContext.getCart()
        counter.textContent =initialCart.reduce((total, acc) => total + acc.quantity, 0)

        return counter
    }


}