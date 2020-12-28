import mongoose from 'mongoose'
import colors from 'colors'
const connectDB = async ()=>{
    try{
        const conn= await mongoose.connect(process.env.MONGODB_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true,
            useCreateIndex:true
        })
        console.log(`MongoDB CONNECTED: ${conn.connection.host}`.cyan.underline)
    }catch(err){
        console.log(`Error: ${err.message}`.red)
        process.exit(1)
    }
}
export default connectDB;