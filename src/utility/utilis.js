export class Utils {
    
    static starRender(itemDiv, rate){
        const rates = Number(rate)
        const fullStar = parseInt(rates)
        
        for(let i=1;i<=fullStar;i++){
            const span = document.createElement('span')
            span.className="star-icon"
            span.innerHTML=`<i class="fa-solid fa-star"></i>`
            itemDiv.appendChild(span)
        }

        const isDecimal = rates -(rates%1)===0?true: false
        if(!isDecimal){
            const span = document.createElement('span')
            span.className="star-icon"
            span.innerHTML=`<i class="fa-solid fa-star-half"></i>`
            itemDiv.appendChild(span)
        }

    }

}