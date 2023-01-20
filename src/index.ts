import express from 'express'
import morgan from 'morgan'
import titlesRouter from './routes/titulos'

const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
app.use(morgan('tiny'))

app.use('/titles/v1', titlesRouter)

app.listen(port, () => {
  console.log('🚀 ignition...')
})

