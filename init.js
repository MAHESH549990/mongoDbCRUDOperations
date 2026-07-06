const mongoose = require('mongoose');
const Chat=require("./models/chat.js");

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

//create chat
let Allchats=([{
  from:"Mahesh",
  to:"Priyanshu",
  msg:"Thala for a reason",
  date:new Date(),
},
{
  from:"Neha",
  to:"Gayatri",
  msg:"When our exam will start today",
  date:new Date(),
},
{
  from:"Saurav",
  to:"Nidhi",
  msg:"Please send me today class notes",
  date:new Date(),
},
{
  from:"Akshita",
  to:"Arjun",
  msg:"Complte your delivery module at night",
  date:new Date(),
},
{
  from:"Rohit",
  to:"Riya",
  msg:"Please Complete the project ppt",
  date:new Date(),
}
]);


Chat.insertMany(Allchats)
.then((res)=>{
  console.log(res);
})
.catch((err)=>{
  console.log(err);
});