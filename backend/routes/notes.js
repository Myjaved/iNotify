const { Router } = require('express')
const express = require('express')
const router = express.Router()
var getuser = require('../middleware/getuser')
const Note = require('../mgsmodels/Note')
const mongoose = require('mongoose')
const { Schema } = mongoose;
const { body, validationResult } = require('express-validator');




//Route-1: Get all notes using :GET "/api/auth/getuser, login required
router.get('/fetchallnotes', getuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        res.json(notes)

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal error occured")
    }
})


//Route-2: Get all notes using :POST "/api/auth/addnote, login required
router.post('/addnotes', getuser, [
    body('title', 'Enter a valid title').isLength({ min: 5 }),
    body('description', 'description must be atleast 5 characters').isLength({ min: 5 })], async (req, res) => {
        try {

            const { title, description, tag } = req.body
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const note = new Note({ title, description, tag, user: req.user.id })

            const savednote = await note.save()
            res.json(savednote)
        } catch (error) {
            console.error(error.message)
            res.status(500).send("internal server error")
        }
    })



//Route-3: Update an existing notes using :PUT "/api/auth/updatenote, login required

router.put('/updatenote/:id', getuser, async (req, res) => {
    const { title, description, tag } = req.body

    //create a new note object
    const newNote = {}
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id)
    if (!note) { return res.status(404).send("404 not found") }

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed")
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note })
})




// Route-4: Delete an existing notes using :DELETE "/api/auth/deletenote, login required

router.delete('/deletenote/:id', getuser, async (req, res) => {
    const { title, description, tag } = req.body

    try {
        //find the note to be delete and delete it
        let note = await Note.findById(req.params.id)
        if (!note) { return res.status(404).send("404 not found") }

        //Allow deletion if only user owns this notes
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({ "success": "Note has been deleted" })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server Error")
    }
})


module.exports = router