// import { config } from '../urlConstants';
// const url = config.url;

document.getElementById("submit").addEventListener("click", onSubmit);
document.getElementById("clear").addEventListener("click", clear);

var scoreHuman = document.getElementById("humanScore");
var scoreComputer = document.getElementById("computerScore");

function getRadioValue() {
  
var inputs = document.getElementsByName("option");

for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].checked) {
    return inputs[i].value;
    }
  }
};
const moneytracker = 999
function gainMoney(){
    let moneyGain = + 50
    
    console.log(moneyGain)
    sendGainMoney(moneyGain)
}
function lostMoney(){
  let moneyLost = + 20
    
  console.log(moneyLost)
  sendLostMoney(moneyLost)
}


async function sendLostMoney (moneyLost) {
  const idk = await fetch(
    `royalinvestment-production.up.railway.app/users/home/game/lost`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        moneylost: moneyLost,
      }),
    }
  )
    .then((res) => res.json())
    .then((data) => console.log(data));
}

async function sendGainMoney (moneyGain) {
    const idk = await fetch(
      `royalinvestment-production.up.railway.app/users/home/game/won`,
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          moneyAdded: moneyGain,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
}

async function onSubmit() {

  var Selections = ["Rock", "Paper", "Scissors"];
  var humanGuess = getRadioValue();
  var computerGuess =  Selections[Math.floor(Math.random() * 3)];
  
  document.getElementById("humanResult").innerHTML = humanGuess;
  document.getElementById("computerResult").innerHTML = computerGuess;
  let money = document.getElementById("money")
    if ( humanGuess === computerGuess ){
          document.getElementById("result").innerHTML = "DRAW"
    }
    if (humanGuess === "Rock") {
        if (computerGuess === "Scissors") {
          document.getElementById("result").innerHTML = "YOU WIN"
          scoreHuman.innerHTML = parseInt(scoreHuman.innerHTML)+1; 
          money.innerHTML = "You won $50"
                gainMoney()
        } else {
          if (computerGuess === "Paper") {
            document.getElementById("result").innerHTML = "YOU LOSE"
            scoreComputer.innerHTML = parseInt(scoreComputer.innerHTML)+1;
            money.innerHTML = "You lost $20"
            lostMoney()
          }
        }
    }
    if (humanGuess === "Scissors") {
        if (computerGuess === "Paper") {
          document.getElementById("result").innerHTML = "YOU WIN"
          scoreHuman.innerHTML = parseInt(scoreHuman.innerHTML)+1; 
          money.innerHTML = "You won $50"
          gainMoney()
        } else {
          if (computerGuess === "Rock") {
            document.getElementById("result").innerHTML = "YOU LOSE"
             scoreComputer.innerHTML = parseInt(scoreComputer.innerHTML)+1;
             money.innerHTML = "You lost $20"
             lostMoney()
          }
        }
    }
    if (humanGuess === "Paper") {
        if (computerGuess === "Rock") {
          document.getElementById("result").innerHTML = "YOU WIN"
          scoreHuman.innerHTML = parseInt(scoreHuman.innerHTML)+1; 
          money.innerHTML = "You won $50"
          gainMoney()
        } else {
          if (computerGuess === "Scissors") {
            document.getElementById("result").innerHTML = "YOU LOSE"
            scoreComputer.innerHTML = parseInt(scoreComputer.innerHTML)+1;
            money.innerHTML = "You lost $20"
            lostMoney()
          }
        }
    }
  
};

function clear() {
  document.getElementById('humanResult').innerHTML = "";
  document.getElementById('computerResult').innerHTML = "";
  document.getElementById('result').innerHTML = "";
  document.getElementById('humanScore').innerHTML = "0";
  document.getElementById('computerScore').innerHTML = "0";
};