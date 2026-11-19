import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
    {
        user : { type : mongoose.Schema.Types.ObjectId , ref : "User" , required : true },
        type : { type : String , enum : [ "income" , "expense" ] , required : true },
        amount : { type : Number , required : true , min : 0 },
        category : { type : String , trim : true },
        date : { type : Date , default : Date.now },
        note : { type : String , trim : true }
    },
    {   timestamps : true   }
)

export default mongoose.model("Transaction" , TransactionSchema ) ;