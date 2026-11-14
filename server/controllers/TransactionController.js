import Transaction from "../models/Transaction.js";

export const addTransaction = async ( req , res ) => {
    try {
        const { user , type , amount , category , date , note } = req.body ;

        if( !type || !category || !amount ){
            res.status(400).json({ message : "type , amount & category are required !"})
        }

        const transaction = await Transaction.create({
            user : req.user._id ,
            type ,
            amount ,
            category ,
            date , 
            note 
        });
        
        res.status(201).json(transaction);

    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}

export const getTransactions = async ( req , res ) => {
    try {
        
        const { month , year , category , type } = req.query ;

        const filter = { user : req.user._id };
        if(category){ filter.category = category }
        if(type){ filter.type = type }

        if( month ){
            const y = Number(year) || new Date().getFullYear();
            const start = new Date(y, Number(month) - 1 , 1);
            const end = new Date(y , Number(month) , 1 );
            filter.date = { $gte : start , $lte : end };
        }

        const transaction = await Transaction.find(filter).sort({ date : -1 });

        res.json(transaction);
    } catch (err) {
        res.status(500).json({ message : err.message });
    }
}

export const updateTransaction = async( req , res ) => {
    try{

        const transaction = await Transaction.findOneAndUpdate(
            { _id : req.params.id , user : req.user._id },
            req.body,
            { new : true , runValidators : true }
        );

        if( !transaction ){
            res.status(404).json({ message : "Transaction Not Found !"});
        }

        res.json(transaction);
    }catch( error ){
        res.status(500).json({ message : error.message });
    }
}

export const deleteTransaction = async ( req , res ) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
             _id : req.params.id , user : req.user._id 
        })

        if( !transaction ){
            res.status(404).json({ message : "Transaction Not Found ! "});
        }

        res.json({ message : "Transaction Deleted !" });
    } catch (error) {
        res.status(500).json({ message : error.message });
    }
}

export const getSummary = async ( req , res ) => {
    try {
        
        const transactions = await Transaction.find({ user : req.user._id });

        let totalIncome = 0 ;
        let totalExpense = 0 ;

        transactions.forEach( (t) => {
            if( t.type == "income" ){ totalIncome += t.amount ; }
            else{ totalExpense += t.amount ; }
        });

        res.json({
            totalIncome,
            totalExpense,
            balance : totalIncome - totalExpense 
        })
    } catch (error) {
        res.status(500).json({ message : error.message })
    }
}