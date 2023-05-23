const uri = "mongodb+srv://MHMDsanan:GvQNwoH8H12yLIoJ@clusture.lhi7nuz.mongodb.net/?retryWrites=true&w=majority";
const mongoose=require('mongoose');
mongoose.set('strictQuery',true);
mongoose.connect(uri);
mongoose.connection.on("connected",(err)=>{
    if(err){
        console.log(err);
    }else{
        console.log("db connected");
    }
})
