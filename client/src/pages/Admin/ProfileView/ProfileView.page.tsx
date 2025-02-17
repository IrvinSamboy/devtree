import { useState } from "react"
import Input from "../../../components/ui/Input"

export default function ProfileView() {

  const [drag, setDrag] = useState(false)
  
  const handleOnDrop = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("drop")
  }
  const handleOnDragOver = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const handleOnDragEnd = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <h2 className="text-center text-xl font-semibold">Edit information</h2>
      <div className="space-y-2">
        <Input
            placeHolder="User name"
            label = "User name"
            type = "text"
        />
        <Input
            placeHolder="email"
            label = "Email"
            type = "text"
        />
       <div className="space-y-1">
          <p>Image</p>
          <div className={`py-10 px-4 border-mid-purple border rounded-lg ${drag&& 'bg-mid-purple/50'}`} onDragLeave={handleOnDragEnd} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
            <p className="text-center text-xl text-gray-500">Drag a image here to upload or <br/><span className="text-lg border-b ">CLick here to browse</span></p>   
          </div>
       </div>
      </div>
    </div>
  )
}
