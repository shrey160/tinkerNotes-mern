

export async function reqIden(req,res,next) {
    try {
        console.log(`Received ${req.method} request for ${req.url}`)
        next()
    } catch (error) {
        console.error("Error in reqIden middleware: ", error)
        res.status(500).json({message: "Error in request identification", error: error.message})
    }
}