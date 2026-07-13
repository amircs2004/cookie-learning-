const  User = require('../model/user')
const  coonectedDatabase = require('../connection/connection')

const hackableUpdate = async (req , res) => {
    /*
    const { userid } = req.params; // Assuming the user ID is passed as a parameter in the request URL
*/
try {
    await coonectedDatabase() 
if(req.user.id !== req.params.id) {
   return res.status(401).json({ msg: 'You are not authorized to update this user' });  
}
 
  /*  if( userid !== req.params.id){
        return res.status(401).json({ msg : 'you are not authorized to update this user' ,})
    }
        */
    const findUserAndUpdate  = await User.findByIdAndUpdate(req.params.id  , req.body ,{new : true})
    res.status(201).json({
        msg : 'update' , 
        data : findUserAndUpdate 
    })
}catch(error){
    return  res.tatus(500).json({ msg : 'update' ,})
}
}
const testController = async (req , res) => {
     res.status(200).json({ msg : 'testing the hackable update' ,})
} 
module.exports = {hackableUpdate  , testController}