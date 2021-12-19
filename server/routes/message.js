
const router = require('express').Router()
const Message = require('../models/Message.js')


router.post('/', async (req, res)=>{
    const newMessage = new Message(req.body)

    try {
        const savedMessage = await newMessage.save()
        res.status(200).send(savedMessage)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/:conversationId', async (req, res)=>{

    try {
        const messages = await Message.find({
            conversationId: req.params.conversationId,
        })
        res.status(200).send(messages)
    } catch (error) {
        res.status(500).send(error.message)
        
    }
})



module.exports = router