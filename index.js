//actual working file that connect backend with front end
const express=require("express");
const app=express()
const port=3200
const path=require("path")
const mongoose=require("mongoose");
const modelchat=require("./model/chat")
const methodOverride=require('method-override');

main().then(()=>{
    console.log("connection to db successfull")
}).catch((err)=>{
    console.log(err)
})
async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp")
}

app.set("view engine","ejs")
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.get("/",(req,res)=>{
    res.send("working home page")
})
app.get("/chat",async (req,res)=>{
    const chats=await modelchat.find()
    res.render("showchat.ejs",{chats})
    console.log(chats)
})
app.get("/chat/new",(req,res)=>{
    res.render("new.ejs")
})
//creating a post from user
app.post("/chat",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat=new modelchat({
        from: from,
        msg:msg,
        to:to,
        created_at:new Date()
    })
    newChat.save()
    res.redirect("/chat")
})
//update
app.get("/chat/:id/edit",async (req,res)=>{
    let {id}=req.params;
    console.log(id);
    let chat=await modelchat.findById(id);
    res.render("edit.ejs",{chat})
})
app.put("/chat/:id",async (req,res)=>{
    let {id}=req.params;
    let {newMsg}=req.body;
    let updateMsg=await modelchat.findByIdAndUpdate(id,{msg:newMsg},{ runValidators: true })
    res.redirect("/chat")
})
//destroying chat
app.delete("/chat/:id",async(req,res)=>{
    let {id}=req.params
    let deleteChat=await modelchat.findByIdAndDelete(id)
    console.log(deleteChat)
    res.redirect("/chat")
})
app.listen(port,()=>{
    console.log("app is listening on port")
})