import { useState } from "react"
import Input from "../../../components/ui/Input"
import { useUserData } from "../../../providers/User"
import Loader from "../../../components/utils/Loader"
import Button from "../../../components/ui/Button"

export default function ProfileView() {

  const [drag, setDrag] = useState(false)

  const { data: userData, isError, isLoading } = useUserData()


  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("drop")
  }
  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  return (

    <div className="bg-white p-4 rounded-lg shadow-lg">
      {isLoading ?
        <Loader />
        :
        isError ?
          <p>ERROR</p>
          :
          <>
            <h2 className="text-center text-xl font-semibold">Edit information</h2>
            <div className="space-y-2">
              <Input
                placeHolder="User name"
                label="User name"
                type="text"
                value={userData?.userName}
              />
              <Input
                placeHolder="email"
                label="Email"
                type="text"
                value={userData?.email}
              />
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Description</label>
                <textarea 
                  name="" 
                  id=""
                  className="bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black"
                  value={userData?.description}
                ></textarea>
              </div>
              <div className="space-y-1">
                <p>Image</p>
                <div className={`py-10 px-4 border-mid-purple border rounded-lg ${drag && 'bg-mid-purple/50'}`} onDragLeave={handleOnDragEnd} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
                  <p className="text-center text-xl text-gray-500">Drag a image here to upload or <br /><span className="text-lg border-b ">CLick here to browse</span></p>
                </div>
              </div>
              <Button
                disabled={isLoading}
              >
                {isLoading ? <Loader styles="border-white !p-2" /> : "Send"}
              </Button>
            </div>
          </>
      }
    </div>
  )
}
