const { application } = require('express')
const express = require('express')
const router = express.Router()
const Subscribers = require('../models/Subscribers')

//get users detail
router.get('/',async (req,res)=>{
    try{
        const subscribers = await Subscribers.find()
        res.status(200).json(subscribers) 
    }
    catch(err){
        res.status(500).json({error:err.message}) // some thing was wrong on database side.
    }
})

//get single user detail
// here the middleware getSubscriber is called before and data is stored in res...
router.get('/:id',getSubscriber,(req,res)=>{
    res.send(res.subscriber)
})

//create a user
router.post('/',async (req,res)=>{
    const subscriber = new Subscribers({
        name:req.body.name,
        email:req.body.email,
        SubscribedToChannel:req.body.SubscribedToChannel,
        SubscriptionOnDate:req.body.SubscriptionOnDate
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)//status 201 => created something
    }
    catch(err){
        res.status(400).json({error:err.message})//status 400 => user sent some bad data
    }
})

//update a user
router.patch('/:id',getSubscriber,async(req,res)=>{
    if(req.body.name != null){
        res.subscriber.name = req.body.name
    }
    if(req.body.email != null){
        res.subscriber.email = req.body.email
    }
    try{
        const updatedUser = await res.subscriber.save()
        res.json(updatedUser)
    }
    catch(err){
        res.send(400).json({message:error.message})
    }
})

//delete a user
router.delete('/:id',getSubscriber,async (req,res)=>{
    try{
        await res.subscriber.remove()
        res.json({message:"Deleted subscriber"})
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
    
})

async function getSubscriber(req,res,next){
    let subscriber
    try{
        subscriber = await Subscribers.findById(req.params.id)
        if(subscriber == null){
            return res.status(404).json("subscriber not found")
        }
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.subscriber = subscriber
    next()
}

module.exports = router
