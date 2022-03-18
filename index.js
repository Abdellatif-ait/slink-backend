const express=require("express")
const ConnectDB=require("./DB/db_init")
const invalidReq=require("./app/helpers/res")
const cors=require('cors')

const link=require('./app/routes/url')
const user=require('./app/routes/user')
const app= express();

require("dotenv").config();
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use(cors())

ConnectDB();


app.get('/',(req,res)=>{
    res.send('hiiiii')
})

app.use('/link',link)
app.use('/user',user)
app.all('*',invalidReq)

app.listen(process.env.PORT || 5000,()=>{
    console.log("Server is Listening")
})