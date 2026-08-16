import express from 'express'
import todoRoutes from './routes/todoRouters.js'

const app = express()
const PORT = 1212

app.use(express.json())
app.use('/', todoRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

