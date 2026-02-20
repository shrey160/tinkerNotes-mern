import {useState,useEffect} from "react"
import {Link, useNavigate, useParams} from "react-router"
import axiosInstance from "../lib/axios"
import toast from "react-hot-toast"
import { ArrowLeft, LoaderIcon, Trash2Icon } from "lucide-react"

const NoteDetailPage = () => {

  const[note,setNote] = useState(null)
  const[loading,setLoading] = useState(true)
  const[saving,setSaving] = useState(false)

  const navigate = useNavigate()

  const {id} = useParams()

  // Fetch the note details when the component mounts or when the id changes
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await axiosInstance.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        toast.error("Failed to fetch note details. Please try again.")
        console.error("Error fetching note details:", error)  
      }finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  console.log({note})

  // Function to handle note deletion
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) {
      return
    }
    try {
      await axiosInstance.delete(`/notes/${id}`)
      toast.success("Note deleted successfully!")
      navigate("/") // Redirect to home page after deletion
    } catch (error) {
      console.error("Error deleting note:", error)
      toast.error("Failed to delete note. Please try again.")
    }
  }

  const handleSave = async () => {
    if(!note.title || !note.content) {
      toast.error("Title and content cannot be empty.")
      return
    }
    setSaving(true)
    try {
      await axiosInstance.put(`/notes/${id}`, note)
      toast.success("Note updated successfully!")
      navigate("/") // Redirect to home page after saving changes
    } catch (error) {
      console.error("Error updating note:", error)
      toast.error("Failed to update note. Please try again.")
    } finally {
      setSaving(false)
    }
  }
  

  if (loading) {
    return <LoaderIcon className="size-12 text-primary animate-spin mx-auto my-20" />
  }

  // Render loading state, note details, or a message if the note is not found
  return (
    <div className = "min-h-screen bg-base-200">
      <div className = "container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <Link to="/" className="btn btn-ghost">
              <ArrowLeft className="size-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="btn btn-error btn-outline" disabled={saving}>
              <Trash2Icon className="size-5" />
              Delete Note
            </button>
          </div>

          <div className = "card bg-base-100 shadow-md">
            <div className="card-body">
              <div className = "form-control mb-4">
                <label className = "label">
                  <span className = "label-text">Title</span>
                </label>
                <input type="text" placeholder= "Note title" className = "input input-bordered" value = {note?.title || ""} onChange = {(e) => setNote({...note, title: e.target.value})}/>
              </div>
              <div className = "form-control mb-4">
                <label className = "label">
                  <span className = "label-text">Content</span>
                </label>
                <textarea placeholder= "Note content" className = "textarea textarea-bordered h-40" value = {note?.content || ""} onChange = {(e) => setNote({...note, content: e.target.value})}/>
              </div>

              <div className = "card-actions justify-end">
                <button className = "btn btn-primary" disabled={saving} onClick= {handleSave}>{saving ? "Saving..." : "Save Changes"}</button>
                

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
