const { json } = require('express')
const express = require('express')
const router = express.Router()
const Notes = require('../models/notes')


router
.route('/')
.post( async (req, res) =>{
    const {formInput, userID} = req.body
    const note = new Notes({
        userId: userID,
        text: formInput
    })
    
    console.log(formInput)
    try {
        const newNote = await note.save()
        res.status(204).end()
    } catch(err){
        res.status(400).json({message: err.message})
    }
})

router
.route('/:id')
.delete(async (req, res)=>{
    const noteID = req.params.id
    let note
    try {
        note = await Notes.findById(noteID)
        .then((currNote)=>{
            currNote.remove()
            console.log("klart")
        })
        if(note == null){
            return res.status(404).json({message: 'Cannot find note'})
        }
    }catch(err){
        return res.status(500).json({message: err.message})
    }
})


module.exports = router