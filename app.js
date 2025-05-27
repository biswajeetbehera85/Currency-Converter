const BASE_URL="https://api.currencyapi.com/v3/latest?apikey=cur_live_orfWWKRjvrEGalWIyWkwTnziqpoV3awP0SyiOwPl&base_currency=INR&currencies=USD"
const dropdowns=document.querySelectorAll(".dropdown select")

let btn=document.querySelector("button")


for (let select of dropdowns) {
    
   for(code in countryList ){
    let newOption=document.createElement("option")
    newOption.innerText=code
    newOption.value=code

    if (select.name === "from" && code === "USD") {
        newOption. selected = "selected";
    }
          
   else if (select.name === "to" && code === "INR") {newOption. selected = "selected";

   }

    select.append(newOption)
 }
   

   select.addEventListener("change",(evt)=>{

    updateFlag(evt.target)
   
   })
}

const updateFlag=(element)=>{
    let currCode=element.value
    let contryCode=countryList[currCode]
    let newSrc=`https://flagsapi.com/${contryCode}/flat/64.png`

    let img=element.parentElement.querySelector("img")
  
    img.src=newSrc
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector("form input")
    let amtValue=amount.value

    if(amtValue===""||amtValue < 1){

        amtValue=0
        amount.value=0

    }

    let from=document.querySelectorAll("select")
    let fromValue=from[0].value
 
    let to=document.querySelectorAll("select")
    let toValue=to[1].value
    

   
    let response= await fetch(`https://api.currencyapi.com/v3/latest?apikey=cur_live_orfWWKRjvrEGalWIyWkwTnziqpoV3awP0SyiOwPl&base_currency=${fromValue}&currencies=${toValue}`)
    let data= await response.json()
   const exchangeRate=data.data[toValue].value
   
   let msg=document.querySelector(".msg")
   
   msg.innerText=`${amtValue} ${fromValue} = ${(exchangeRate*amtValue).toFixed(2)} ${toValue}`


})
