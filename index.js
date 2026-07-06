const express= require('express');
const app=express();
const port=8080;
const mongoose = require('mongoose');
const path=require('path');
const Chat=require("./models/chat.js");
const methodOverride=require("method-override");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
main()
.then((res)=>{
  console.log("Database connected successfully");
})
.catch((err)=>{
  console.log(err);
});
async function main(){
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}



app.listen(port,()=>{
  console.log(`Server is running on port ${port}`);
});

app.get("/",(req,res)=>{
  res.send("Working well!");
});

app.get("/chats",async (req,res)=>{
  let chats=await Chat.find();
  res.render("chat.ejs",{chats});
});


app.get("/chats/new",(req,res)=>{
  res.render("new.ejs");
});

app.post("/chats",(req,res)=>{
   let {from,msg,to}=req.body;
   let newChat=new Chat({
    from:from,
    to:to,
    msg:msg,
    date:new Date(),
   })
   newChat.save()
   .then((res)=>{
    console.log("Chat saved");
   })
   .catch((err)=>{
    console.log(err);
   });
 res.redirect("/chats");
});

app.get("/chats/:id/edit", async (req,res)=>{
  let {id}=req.params;
  let chat=await Chat.findById(id);
  res.render("edit.ejs",{chat});
});

//update
app.put("/chats/:id", async(req,res)=>{
   let {id}=req.params;
   let {msg:newMsg}=req.body;
   let newChat=await Chat.findByIdAndUpdate(id,
    {
     msg:newMsg},
  { runValidators:true,new:true,}
  );
  console.log(newChat);
  res.redirect("/chats");
})

//delete

app.delete("/chats/:id",async(req,res)=>{
  let {id}=req.params;
  let deleteChat= await Chat.findByIdAndDelete(id);
  console.log(deleteChat);
  res.redirect("/chats");
});