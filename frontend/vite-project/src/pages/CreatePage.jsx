import { useState } from "react"                  // Make sure to import useState for managing form state
import { Link, useNavigate } from "react-router"  //  Make sure to import useNavigate for programmatic navigation after note creation
import { ArrowLeftIcon } from "lucide-react"      // Make sure to import the icon for the back button
import toast from "react-hot-toast"               // Make sure to import toast for showing notifications
import axios from "axios"                         // Make sure to import axios for making HTTP requests

const CreatePage = () => {
  const [title,setTitle] = useState("")         // State for the note title
  const [content,setContent] = useState("")     // State for the note content
  const [loading,setLoading] = useState(false)  // State to manage loading state during note creation

  const navigate = useNavigate()        // For programmatic navigation after note creation

  // Function to handle form submission and create a new note
  const handleSubmit = async (e) => {
    e.preventDefault()  // Prevent the default form submission behavior

    // Basic validation to ensure title and content are not empty
    if (!title || !content) {
      toast.error("Please fill in both title and content fields.")
      return
    }

    setLoading(true)    // Set loading state to true while the note is being created
    try {
      await axios.post("http://localhost:5001/api/notes", { title, content })
      toast.success("Note created successfully!")
      setTitle("")
      setContent("")
      navigate("/") // Redirect to home page after successful creation  
    } catch (error) {
      setLoading(false)
      console.error("Error creating note:", error)
      toast.error("Failed to create note. Please try again.")
    }
  }


  // Render the form for creating a new note
  return (
    <div className = "min-h-screen bg-base-200">     
      <div className = "container mx-auto px-4 py-8">
        <div className = "max-w-2xl mx-auto">
          <Link to = "/" className = "btn btn-ghost mb-6">
            <ArrowLeftIcon className = "size-5" />
            Back to Notes
          </Link>
          <div className = "card bg-base-100 shadow-md">
            <div className = "card-body">
              <h2 className = "card-title">Create New Note</h2>
              <form onSubmit = {handleSubmit}> 
                <div className = "form-control mb-4">
                  <label className = "label">
                    <span className = "label-text">Title</span>
                  </label>
                  <input type="text" placeholder="Note Title" className = "input input-bordered" value = {title} onChange = {(e) => setTitle(e.target.value)}/>
                </div>
                <div className = "form-control mb-4">
                  <label className = "label">
                    <span className = "label-text">Content</span>
                  </label>
                  <textarea placeholder="Write your Note Content here..." className = "textarea textarea-bordered" value = {content} onChange = {(e) => setContent(e.target.value)}/>
                </div>

                <div className = "card-actions justify-end">
                  <button type="submit" className = "btn btn-primary" disabled={loading}>{loading ? "Creating..." : "Create Note"}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
