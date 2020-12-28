import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import productRoutes from './route/productRoutes.js'
import { notFound,errorHandler } from './middleware/errorMiddleWare.js'
import userRoutes from './route/userRoutes.js'
import orderRoutes from './route/orderRoutes.js'
import uploadRoutes from './route/uploadRoutes.js'

dotenv.config()

connectDB()

const app = express()

if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}


app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)


const __dirname= path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))


app.use(notFound)
app.use(errorHandler)



const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server running ON port ${PORT}`.yellow))