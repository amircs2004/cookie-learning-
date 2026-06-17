const mongoose = require('mongoose')
const coonectedDatabase = require('../connection/connection')

const terstingDatabaseConnection = async (req , res) => {
   try{
       await coonectedDatabase()
       return res.status(200).json({msg: 'Database connected successfully!'})

   }catch(error){
   console.error("Connection test failed:", error);
        return res.status(500).json({ 
            msg: 'Database could not connect', 
            error: error.message 
        });
   }

}
module.exports = terstingDatabaseConnection