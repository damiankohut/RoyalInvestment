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
