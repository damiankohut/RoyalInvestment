window.addEventListener('DOMContentLoaded', () => {
    const work = document.getElementById("submit2");
    work.addEventListener('click', stockFinder )
   })
   function stockFinder() {
    const input2 = document.getElementById('code2');
    getstock(input2.value)
}

function getstock(stocky){
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stocky}&apikey=9D9QUG0FRKAE9VJ8`)
    .then(function(response){
        return response.json()
    }).then(function(data){ console.log(data["Global Quote"]["05. price"]), console.log(data["Global Quote"]["01. symbol"]), console.log(console.log(data))
 document.getElementById('stockInfo').innerHTML = `
 <div class="container" style="padding-left: 0px;padding-right: 0px;">
 <div class="row" style="width: 1500px;margin-right: 0px;margin-left: 0px;">
 <div class="col-md-4 col-xl-3" style="">
     <div class="card bg-c-blue order-card">
         <div class="card-block">
             <h6 class="m-b-20" id="">${data["Global Quote"]["01. symbol"]}</h6>
             <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span>${data["Global Quote"]["05. price"]}</span></h2>
             <p class="m-b-0"><button id="text"> Buy </button><span class="f-right"><label for="tentacles">Number of stocks:</label>
             <input type="number" id="tentacles" name="tentacles" min="10" max="100"></span></p>
             <p class="m-b-0"><button id="text"> Sell </button><span class="f-right"><label for="tentacles">Number of stocks:</label>
             <input type="number" id="tentacles" name="tentacles" min="10" max="100"></span></p>
         </div>
     </div>
 </div>
</div>
`
})
}




const API_key = "9D9QUG0FRKAE9VJ8";

let tickButton = document.getElementById('tick-button');
let tickerSearch = document.getElementById('ticker-search');
let cardInfo = document.getElementById('card-text', renderCardText)
// fetch('http://localhost:3000/users/home')
// .then(res => res.json())
// .then(data => console.log(data))

tickButton.addEventListener('click', () => {
    getPrice(tickerSearch.value);
    // getPortfolio()

})

async function renderCardText(stock) {
    const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
    let price = await fetch(url+ stock +"&apikey=" + API_key)
    .then(res => res.json())
    .then(data => {
        return data["Global Quote"]["02. open"]["03. high"]["04. low"]["04. low"]["05. price"]["06. volume"]
     
});
}


// async function getPrice(stock) {
//     const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
//     let price = await fetch(url+ stock +"&apikey=" + API_key)
//     .then(res => res.json())
//     .then(data => {
//         return data["Global Quote"]["05. price"]
//       console.log(price)
// });
// }


// async function getprice(){

// }
// let price = getprice()
 async function getPrice(stock) {
    const url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="
    let price = await fetch(url+ stock +"&apikey=" + API_key)
    .then(res => res.json())
    .then(data => { 
       return data["Global Quote"]["05. price"]
        
    });
    console.log(price)

     fetch('http://localhost:3000/users/home', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stockName: stock,
            price: price
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
    
}




// function getPortfolio(){
//     let portfolio = fetch('http://localhost:3000/home').then(res => res.json()).then(data => data)
// console.log("hello")
// return portfolio
// }
// getPortfolio()
