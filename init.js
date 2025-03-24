//sole purpose of this code is to just send data in database
const mongoose=require("mongoose")
const chat=require("./model/chat");
main().then(()=>{
    console.log("connection to database successfull")
}).catch((err)=>{
    console.log(err);
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}
let allChats=[
    {
        from:"Hariom",
        to:"Shyam",
        msg:"Hello!",
        created_at:new Date()
    },
    {
        from:"Shyam",
        to:"Hariom",
        msg:"Bol",
        created_at:new Date()
    },
    {
        from:"Hariom",
        to:"Shyam",
        msg:"Bol rahe hai Extra copy hai tumhare pas white me",
        created_at:new Date()
    },
    {
        from:"Shyam",
        to:"Hariom",
        msg:"Haa Aakar lele",
        created_at:new Date()
    },
    {
        from:"Hariom",
        to:"Shyam",
        msg:"ok",
        created_at:new Date()
    },
]
chat.insertMany(allChats)