const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');

app.set('view engine',path.join(__dirname, 'views'));
app.set('view engine','ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended:true }));
app.use(methodOverride("_method"));

main()
.then(()=>{
    console.log('connection established');
})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

// let chat1 = new Chat ({
//     from:"rehan",
//     to:"sofia",
//     message:"assalam-o-alaikum",
//     created_at:new Date(),
// });

// chat1.save().then((res)=>{
//     console.log(res);
// })

app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
    // console.log(chats);
    res.render("index.ejs",{chats});
})

// new route
app.get("/chats/new",(req,res)=>{{
    res.render("new.ejs");
}});

// create route 
app.post("/chats",(req,res)=>{
   let {from,to,message} = req.body;
   let newChat = new Chat ({
    from: from,
    to: to,
    message: message,
    created_at: new Date(),
   });
   newChat
   .save()
   .then((res)=>{
       console.log("chat was saved successfully");
   })
   .catch((err)=>{
    console.log(err);
   });
   res.redirect("/chats"); 
});

//  edit route 
app.get ("/chats/:id/edit",async (req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat });
});

// update chats
app.put("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let {message:newMessage} = req.body;
    let updatedChat = await Chat.findByIdAndUpdate(id,{message:newMessage},{runValidators:true,new:true});
   console.log(updatedChat);
   res.redirect("/chats");
});

// delete chat
app.delete("/chats/:id",async (req, res) => {
    let {id} = req.params;
    let deletedChat = await Chat.findOneAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get('/',(req,res)=>{
    res.send("hellow server!");
});

app.listen(8080,()=>{
    console.log('server is running on port 8080');
});