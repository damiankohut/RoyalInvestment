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
 <h5>${data["Global Quote"]["01. symbol"]}</h5>
 <h4 id="text">${data["Global Quote"]["05. price"]}</h4>
 <button id = "text"> buy / Sell </button>`
})
}
//       
//         document.getElementById('stockInfo').innerHTML = `
//         <h5>${data["Global Quote"]["01. symbol"]}</h5>
//         <p id="text">${["Global Quote"]["05. price"}</p>
//         <p id = "text"> buy / Sell </p>
//         `



const API_key = "9D9QUG0FRKAE9VJ8";
let stock = 'AAPL'
let button = document.getElementById('button');

// fetch('http://localhost:3000/users/home')
// .then(res => res.json())
// .then(data => console.log(data))

button.addEventListener('click', async () => {
    sendPrice();
    // getPortfolio()
})

// async function getPrice() {
//     let price = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_key}`)
//     .then(res => res.json())
//     .then(data => data["Global Quote"]["05. price"]);
//      return price;
// }
// async function getprice(){

// }
// let price = getprice()
 async function sendPrice () {
    let price = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stock}&apikey=${API_key}`)
    .then(res => res.json())
    .then(data => data["Global Quote"]["05. price"]);
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
    console.log("price")
}


// function getPortfolio(){
//     let portfolio = fetch('http://localhost:3000/home').then(res => res.json()).then(data => data)
// console.log("hello")
// return portfolio
// }
// getPortfolio()
