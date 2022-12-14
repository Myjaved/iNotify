// First step is to connect with our database
const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/inotify"

const ConnectToMongodb=async ()=>{
    await mongoose.connect(mongoURI,()=>{
        console.log("Connected to MongoDB successfully")
    })
}


module.exports=ConnectToMongodb