const API_key = "9D9QUG0FRKAE9VJ8";
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
                    <h6 class="m-b-20" id="stockName">${data["Global Quote"]["01. symbol"]}</h6>
                    <h2 class="text-right"><i class="fa fa-cart-plus f-left"></i><span id="stockPrice">${data["Global Quote"]["05. price"]}</span></h2>
                    <p class="m-b-0"><button id="buy"> Buy </button><span class="f-right"><label for="tentacles" >Number of stocks:</label>
                    <input type= "number" id="buyAmount" name="tentacles" min="10" max="100"></span></p>
                    <p class="m-b-0"><button id="sell">Sell</button><span class="f-right"><label for="tentacles">Number of stocks:</label>
                    <input type="number" id="sellAmount" name="tentacles" min="10" max="100"></span></p>
                </div>
            </div>
        </div>
       </div>
`
const buyButton = document.getElementById('buy');
buyButton.addEventListener('click', buystock)
const sellButton = document.getElementById('sell');
sellButton.addEventListener('click', sellstock)
})
}

function buystock(){
   
    const buyAmount = document.getElementById('buyAmount');
    const stockPrice = document.getElementById('stockPrice');
    const stockName = document.getElementById('stockName');
    sendBuyOrder(stockName.textContent, buyAmount.value, stockPrice.textContent)
    // console.log(stockName.textContent, buyAmount.value, stockPrice.textContent);

}
//get all the parts of the sell element by the id
//have to do a fetch to get the current price (selling at current stock price)
//make a sendsellOrder() and post request to users/home/sell.....use index.js to make an app.post and update the database
function sellstock(){
    const sellAmount = document.getElementById('sellAmount')
    const stockPrice = document.getElementById('stockPrice')
    const stockName = document.getElementById('stockName')
    sendSellOrder(stockName.textContent, sellAmount.value, stockPrice.textContent)
    // console.log(stockName.textContent, sellAmount.value, stockPrice.textContent)
}




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


 async function sendBuyOrder(stock,quantity,price) {

     fetch('http://localhost:3000/users/home/buy', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stockName: stock,
            price: price,
            quantity: quantity
        })
    })
    .then(res => res.json())
    .then(data => console.log(data));
    
}

async function sendSellOrder(stock, quantity,price){

    fetch('http://localhost:3000/users/home/sell', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            stockName: stock,
            price: price,
            quantity: quantity
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
