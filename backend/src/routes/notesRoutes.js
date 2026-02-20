import express from "express"
const router = express.Router()

import { getAllNotes, createNote, updateNote, deleteNote, getNoteById } from "../controllers/notesControllers.js"

router.get("/", getAllNotes)
router.post("/",createNote)
router.put("/:id",updateNote)
router.delete("/:id",deleteNote)
router.get("/:id", getNoteById)

export default router




/*
app.get("/api/notes",(req,res) => {
    res.status(200).send(`Hello `)
})  

app.post("/api/notes",(req,res) => {
    res.status(201).json({message: "Note created successfully"})
})

app.put("/api/notes/:id",(req,res) => {
    res.status(200).json({message: `Note updated successfully`})
})

app.delete("/api/notes/:id",(req,res) => {
    res.status(200).json({message: `Note deleted successfully`})
})
*/