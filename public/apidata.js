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
