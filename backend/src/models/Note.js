import mongoose from "mongoose"
// Define the Note schema
const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

// Create the Note model
const Note = mongoose.model("Note", noteSchema)

// Export the Note model
export default Note 