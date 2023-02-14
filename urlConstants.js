// Constants.js
const production = {
  url: "royalinvestment-production.up.railway.app",
};
const development = {
  url: "http://localhost:3000",
};

export const config =
  process.env.NODE_ENV === "development" ? development : production;
