const express = require('express')
const app = express()
const userRouter = require('./Routes/routes')
const pool = require('./dbconfig')
const port = process.env.PORT || 3000;

//middleware
app.use(express.json())
app.use(userRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
