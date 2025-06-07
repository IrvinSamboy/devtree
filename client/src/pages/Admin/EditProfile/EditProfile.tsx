import { CloudUpload } from "lucide-react"
import Button from "../../../components/ui/Button"
import Input from "../../../components/ui/Input"
export default function EditProfile() {
  return (
    <div className="flex w-full gap-4">
      <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">

        <div className="space-y-2 border-b border-gray-400 p-6">
          <h2 className="text-2xl font-bold">Basic Information</h2>
          <p className="text-gray-500">Update your profile details</p>
        </div>
        <div className=" p-6">
          <form className="space-y-8">
            <Input
              label="Username"
              type="text"
              labelStyle="text-gray-700 font-base"

            />
            <div className="flex flex-col">
              <label htmlFor="" className="text-gray-700 font-medium">Description</label>
              <textarea name="" id="" className="border rounded-lg h-74 resize-none border-gray-400"></textarea>
            </div>
            <Button>Save changes</Button>
          </form>
        </div>


      </div>

      <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">
        <div className="space-y-2 border-b border-gray-400 p-6">
          <h2 className="text-2xl font-bold">Profile images</h2>
          <p className="text-gray-500">Upload your profile and cover images</p>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label htmlFor=""></label>
            <div className="flex items-center gap-4">
              <div className="bg-gray-400 px-7 py-6 rounded-full">
                <p className="text-xl text-white font-semibold">EL</p>
              </div>
              <button className="flex gap-3 border-2 cursor-pointer border-gray-300 p-2 rounded-lg ">
                <CloudUpload />
                Upload
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <label htmlFor="">Cover image</label>
            <div className="w-full h-90 bg-emerald-500 flex items-center rounded-lg justify-center">
              <p className="text-white text-lg font-semibold">
                Cover image
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
