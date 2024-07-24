const mongoose = require('mongoose');
const chat = require("./models/chat.js");
main()
.then(()=>{
    console.log('connection successful');
})
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}


let allchats =[
    {
    from:"rehan",
    to:"sofia",
    message:"gr kb au gi",
    created_at:new Date(),
},
{
    from:"rehan",
    to:'umair',
    message:"kitny papers rh gy hn",
    created_at:new Date(),
},
{
     from:"rehan",
     to:"sofia",
     message:"kaise tabeat hy",
     created_at:new Date(),
},
{
    from:"rehan",
    to:"umar",
    message:"kaise din ja rhy aj kal koi message hi ni karty ho",
    created_at:new Date(),    
},
{
   from:"rehan",
   to:"man",
   message:"hn g koi rabta hi ni kia waja kidr busy hoty ho aj kal",
   created_at:new Date(),
},
{
    from:"rehan",
    to:"shahid",
    message:"kia ho rha hy ,kia bana us sy pata kia tha kia bola uno ny",
    created_at:new Date(),
}
]
chat.insertMany(allchats);

