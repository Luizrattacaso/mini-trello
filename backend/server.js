import express from 'express'
import cors from 'cors' // NOTE: This help to join differents origins (frontend and backend) in development environment
import todoRoutes from './routes/todoRouters.js'
import authRoutes from './routes/authRoutes.js'

const app = express()
const PORT = 1212

app.use(cors())
app.use(express.json())
app.use('/tasks', todoRoutes)
app.use('/auth', authRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

