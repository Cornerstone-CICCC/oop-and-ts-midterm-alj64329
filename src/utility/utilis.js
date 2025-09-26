export class Utils {
    static value = {}
    static copyData
    
    static starRender(itemDiv, rate){
        const rates = Number(rate)
        const fullStar = parseInt(rates)
        
        for(let i=1;i<=fullStar;i++){
            const span = document.createElement('span')
            span.className="star-icon"
            span.innerHTML=`<i class="fa-solid fa-star"></i>`
            itemDiv.appendChild(span)
        }

        const isDecimal = rates%1===0?true: false
        if(!isDecimal){
            const span = document.createElement('span')
            span.className="star-icon"
            span.innerHTML=`<i class="fa-solid fa-star-half"></i>`
            itemDiv.appendChild(span)
        }
    }

    static renderCategory(data){
        Utils.copyData=data
        const categories = []
        this.fetchMinMax(data)
        data.forEach(item =>{
            if(!categories.includes(item.category)){
                categories.push(item.category)
            }
        })
        return categories
    }

    static fetchMinMax(data){
        const prices = data.map(item=>Number(item.price))
        const minVal= Math.min(...prices)
        const maxVal = Math.max(...prices)
        Utils.value.min = minVal
        Utils.value.max = maxVal
    }

    static sortProducts(products,val){
        const option = val[0]
        const orderBy = val[1]
        let sortedProducts = null

        if(option === "rating"){
            if(orderBy === "asc"){
            sortedProducts = products.toSorted((a,b)=>a[option]["rate"] - b[option]["rate"])
            }else{
            sortedProducts = products.toSorted((a,b)=>b[option]["rate"] - a[option]["rate"])
            }
        }else{
            if(orderBy === "asc"){
            sortedProducts = products.toSorted((a,b)=>a[option] - b[option])
            }else{
            sortedProducts = products.toSorted((a,b)=>b[option] - a[option])
            }
        }

        return sortedProducts
    }

    static filterByQuery(query,products){
        const pattern = new RegExp(`\\b${query}\\b`, "i");
        const filtered = products
            .map(item =>{
                let score = 0;

                if(pattern.test(item.title)) score+=3
                if(pattern.test(item.category)) score+=2
                if(pattern.test(item.description)) score+=1

                return {...item, score}
            })

        // sort by relavant
        const sorted = filtered.filter(item=> item.score >0)
                            .sort((a,b)=>b.score - a.socre)
        
        return sorted
    }


}