export class CartContext {
    constructor(){
        const storedCart = localStorage.getItem("cart")
        this.cart =storedCart? JSON.parse(storedCart):[]
        this.listeners =[]

        this.subscribe(this.updateStorage.bind(this))

        this.notifyListners()
    }

    getCart(){
        return this.cart
    }

    addProduct(item, orderQty=null){

        const found = this.cart.find(product => product.id === item.id)
        if(!found){
            this.cart.push({
                ...item,
                quantity:orderQty!==null?parseInt(orderQty):1
            })
        }else{
            this.cart = this.cart.map(product => product.id === item.id?
                {
                    ...product,
                    quantity: product.quantity+(orderQty!==null?parseInt(orderQty):1)
                }
                : product
            )
        }
        this.notifyListners()
    }

    decreaseProduct(item){
        if(item.quantity===1){
            this.cart = this.cart.filter(product => product.id !== item.id)
        }else{
        this.cart = this.cart.map(product => product.id === item.id?{
            ...product,
            quantity: product.quantity- 1
        }:product)
        }

        this.notifyListners()
    }

    removeProduct(item){
        this.cart = this.cart.filter(product => product.id !== item.id)
        this.notifyListners()
    }

    updateStorage(cart){
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    subscribe(listener){
        this.listeners.push(listener)
    }

    notifyListners(){
        this.listeners.forEach(listener => listener(this.cart))
    }
  
}