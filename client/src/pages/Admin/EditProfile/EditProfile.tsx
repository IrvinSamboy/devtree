import { CloudUpload } from "lucide-react"
import Button from "../../../components/ui/ButtonPurple"
import Input from "../../../components/ui/Input"
import { social } from "../../../data/social"
import { useState } from "react"
import { devTreeLink } from "../../../interfaces/User.interface"
import { Switch } from '@headlessui/react'
import { Controller, useForm } from "react-hook-form"

export default function EditProfile() {
  const [socialMediaLink, setSocialMediaLink] = useState<devTreeLink[]>(social)
  const [activeDrag, setActiveDrag] = useState(false)
  const {
          control, 
          handleSubmit, 
  } = useForm()

  const handleCHangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialMediaLink(socialMediaLink.map(item => (
      item.name === e.target.name ? {
        ...item,
        url: e.target.value
      } :
        item
    )))
  }

  const handleChangeStatus = (socialName: string) => {
    setSocialMediaLink(socialMediaLink.map(item => (
      item.name === socialName ? {
        ...item,
        enabled: !item.enabled
      } :
        item
    )))
  }

  const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setActiveDrag(true)
  }

  const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setActiveDrag(false)
  }

  const dragDropFunction = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setActiveDrag(false)
    console.log(e.dataTransfer.files)
  }
  
  return (
    <div className="space-y-6 pb-4">
      <div className="flex w-full gap-4">
        <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">
          <div className="space-y-2 border-b border-gray-400 p-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <p className="text-gray-500">Update your profile details</p>
          </div>
          <div className=" p-6">
            <form className="space-y-8" onSubmit={handleSubmit(() => {})}>
              <Controller 
                name="username"
                control={control}
                render={({field}) => (
                <Input
                  label="Username"
                  type="text"
                  labelStyle="text-gray-700 font-base"
                  onChange={field.onChange}
                  value={field.value}
                />
                )}
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
                <div
                onDragEnter={onDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={onDragLeave}
                onDrop={dragDropFunction}
                className={`flex gap-3 border-2 cursor-pointer p-2 rounded-lg transition-all
                  ${activeDrag? "border-mid-purple scale-110 text-mid-purple" : "border-gray-300"}`
                }>
                  <CloudUpload />
                  <p >Upload</p>
                </div>
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
      <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">
        <div className="space-y-2 border-b border-gray-400 p-6">
          <h2 className="text-2xl font-bold">Social link</h2>
          <p className="text-gray-500">Connect your social media accounts</p>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full p-6">
          {
            socialMediaLink.map((item) => (
              <div className="flex gap-3 items-center bg-white px-4 py-2 border border-gray-300 rounded-lg">
                <img src={`/social/icon_${item.name}.svg`} className="max-w-10" alt="" />
                <input
                  name={item.name}
                  placeholder="Profile URL"
                  onChange={handleCHangeURL}
                  type="text"
                  value={item.url}
                  className="w-full border border-gray-300 p-2 rounded-lg outline-0" />
                <Switch
                  checked={item.enabled}
                  onChange={() => handleChangeStatus(item.name)}
                  className={`${item.enabled ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <span
                    aria-hidden="true"
                    className={`${item.enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
