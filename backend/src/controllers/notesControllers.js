
import Note from '../models/Note.js'

// Controller functions for handling notes-related requests
//----------------------------------------------


// Get all notes

export async function getAllNotes(_,res) {
    //res.status(200).send(`you fetched all notes`)

    try {
        const notes = await Note.find().sort({ createdAt: -1 })  //fetch notes sorted by creation date (newest first)
        res.status(200).json(notes)
    } catch (error) {
        console.error("Error fetching notes: ", error)
        res.status(500).json({message: "Error fetching notes", error: error.message})
    }
}

// Get a note by ID

export async function getNoteById(req,res) {
    //res.status(200).json({message: `you fetched note with id: ${req.params.id}`})
    try {
        const note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json(note)
    } catch (error) {
        console.error("Error fetching note by ID: ", error)
        res.status(500).json({message: "Error fetching note", error: error.message})
    }
}
// Create a new note

export async function createNote (req,res) {
    try {
        const { title, content } = req.body
        if (!title || !content) {
            return res.status(400).json({message: "Title and content are required"})
        }
        const newNote = new Note({ title, content })
        await newNote.save()
        console.log("Received data: ", { title, content })
        res.status(201).json({message: "Note created successfully", note: newNote})
    } catch (error) {
        console.error("Error creating note: ", error)
        res.status(500).json({message: "Error creating note", error: error.message})
    }
}



// Update an existing note

export async function updateNote (req,res) {
    //res.status(200).json({message: `Note updated successfully`})
    try {
        const {title, content} = req.body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, {new: true})
        if (!updatedNote) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json({message: `Note updated successfully`, note: updatedNote})
    } catch (error) {
        console.error("Error updating note: ", error)
        res.status(500).json({message: "Error updating note", error: error.message})
    }
}


// Delete a note

export async function deleteNote (req,res) {
    //res.status(200).json({message: `Note deleted successfully`})
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)
        if (!deletedNote) {
            return res.status(404).json({message: "Note not found"})
        }
        res.status(200).json({message: "Note deleted successfully", note: deletedNote})
    } catch (error) {
        console.error("Error deleting note: ", error)
        res.status(500).json({message: "Error deleting note", error: error.message})
    }
}