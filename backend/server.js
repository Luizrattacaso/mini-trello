import express from 'express'

const app = express()
const PORT = 1212

app.get('/', (req,res) => {
    res.send('Hello, World!').status(200)
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

