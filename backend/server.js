import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import braRoutes from './routes/bra.js'
import pantyRoutes from './routes/panty.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'PerfectFit AI Backend API' })
})

app.use('/api/recommend', braRoutes)
app.use('/api/recommend', pantyRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

