import mongoose from "mongoose";

let isConnected = false // if false, you can track the connecion

// don't forget to make mongo Db database. just go to mongodb.com - create/select shared cluster
// and connect it

export const connectToDB = async () => {
    mongoose.set('strictQuery',true)

    if(isConnected){
        console.log('Mongodb is Conncected >.<')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected = true
        console.log('Mongodb is Conncected')
    } catch (error) {
        console.log(error)
    }
}