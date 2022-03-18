//MONGODB 
const mongoose=require("mongoose")
const URI= "mongodb+srv://SLink:SLink01@slink.ih5aa.mongodb.net/Slink?retryWrites=true&w=majority";

const ConnectDB = async () => {
    await mongoose.connect(URI, {useUnifiedTopology: true, useNewUrlParser: true});
    console.log("Connection Done");
}


//Export
module.exports=ConnectDB;
