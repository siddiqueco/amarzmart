import moongose from 'mongoose'
import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/user.js'
import products from './data/products.js'
import User from './modals/userModel.js'
import Product from './modals/productModel.js'
import Order from './modals/orederModel.js'
import connectDB from './config/db.js'

dotenv.config()
connectDB()

const importData = async ()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUsers=await User.insertMany(users)

        const adminUser = createdUsers[0]._id
        const sampleProducts = products.map(product => {
            return {...product, user: adminUser}
        })

        await Product.insertMany(sampleProducts)

        console.log('Data imported successfully!'.green.inverse)
    }catch(err){
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}



const destroyData = async ()=>{
    try{
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()


        console.log('Data Destroyed!'.red.inverse)
    }catch(err){
        console.error(`${err}`.red.inverse)
        process.exit(1)
    }
}


if(process.argv[2] === '-d'){
    destroyData()
}else{
    importData()
}