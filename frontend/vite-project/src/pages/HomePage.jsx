
import { useState, useEffect } from "react"
import axiosInstance from "../lib/axios.js"
import Navbar from "../components/Navbar.jsx"
import toast from "react-hot-toast"
import Note from "../../../../backend/src/models/Note.js"
import NoteCard from "../components/NoteCard.jsx"
import NotesNotFoud from "../components/NotesNotFound.jsx"

const HomePage = () => {

  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)

  //fetch notes from the backend when the component mounts\

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axiosInstance.get("/notes")
        console.log(res.data)
        setNotes(res.data)
      } catch (error) {
        console.error("Error fetching notes:", error)
        // Assuming toast is available (e.g., from react-toastify)
        toast.error("Failed to fetch notes. Please try again later.")
      } finally {
        setLoading(false) // Set loading to false after the request is completed, regardless of success or failure      
      }

    }

    fetchNotes()

  }, [])  

  //---------------------------

  return (
    <div>
      <Navbar />

      <div className = "max-w-7xl mx-auto p-4 mt-6">

        {loading && <div className="text-center text-primary py-10 text-xl">Loading notes...</div>}

        {notes.length === 0 && <NotesNotFoud/>}

        {notes.length > 0 &&
          <div className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {notes.map(note => (
              <NoteCard key={note._id} note={note} setNotes = {setNotes} /> 

            ))}
            
          </div>
        }
      </div>
      
    </div>
  )
}

export default HomePage
