//logic to fetch
const url = "http://localhost:3000/user"
let token="";

fetch(url,{ headers: {
    Authroization: `Bearer ${token}`,
},
})
.then((response) => response.json()).then(data => console.log(data))




// let token = "";

// const fetchTasks = () => {
//   return fetch(`${baseUrl}/user`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       return data;
//     });
// };

const signUpForm = document.getElementById("sign-up-form");

signUpForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  const data = new FormData(event.target);

  const name = data.get("name");
  const email = data.get("email");
  const password = data.get("password");
 
  const response = await fetch(`${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });

  const responseData = await response.json();
  token = responseData.token;
});

// const signInForm = document.getElementById("sign-in-form");

// signInForm.addEventListener("submit", async function (event) {
//   event.preventDefault();

//   const data = new FormData(event.target);

//   const email = data.get("email");
//   const password = data.get("password");
//    console.log(email, password)
//   const response = await fetch(`${url}/loginuser`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   });

//   const responseData = await response.json();
//   token = responseData.data.token;
// });

// const fetchUserBtn = document.getElementById("fetch-users-button");

// fetchUserBtn.addEventListener("click", () => {
//   fetchTasks();
// });

