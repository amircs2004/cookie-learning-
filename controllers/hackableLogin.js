const  User = require('../model/user')


const hackableUpdate = async (req , res) => {
const { id } = req.user.id

try {
    const findUserAndUpdate  = await User.findByIdAndUpdate(id  , req.body ,{new : true})
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