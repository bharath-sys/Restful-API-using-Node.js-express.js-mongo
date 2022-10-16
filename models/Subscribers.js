const mongoose = require('mongoose')

const SubcribersSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    SubscribedToChannel:{
        type:String,
        required:true
    },
    SubscriptionOnDate:{
        type:Date
    }
})

module.exports = mongoose.model('Subscriber',SubcribersSchema)