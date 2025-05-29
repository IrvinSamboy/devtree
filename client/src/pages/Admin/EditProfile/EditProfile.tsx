import React, { useState } from "react"
import { social } from "../../../data/social"
import { devTreeLink } from "../../../interfaces/User.interface"
import { Switch } from '@headlessui/react'
import { validateUrl } from "../../../components/utils/utils"
import Button from "../../../components/ui/Button"
import { toast } from "react-toastify"
import { useQueryClient } from "react-query"
import { useUpdateUserData } from "../../../providers/User"
import { userData as TuserData } from "../../../providers/User/user.interface"
import Loader from "../../../components/utils/Loader"

export default function EditProfile() {
  
  const queryClient = useQueryClient()

  const [socialMediaLink, setSocialMediaLink] = useState<devTreeLink[]>(social)

  const userData : TuserData = queryClient.getQueryData(["userData"])!

  const {mutate: updateUserData, isLoading } = useUpdateUserData()

  const handleCHangeURL = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSocialMediaLink(socialMediaLink.map(item => item.name === e.target.name? {...item, url: e.target.value } : item))
  }

  const handleChangeStatus = (itemName : string) => {
    setSocialMediaLink(socialMediaLink.map(item => item.name === itemName? {...item, enabled: !item.enabled} : item))
  }

  const handleSubmit = () => {
    let error = false
    for(const item of socialMediaLink) {
      if(item.url){
        if(!validateUrl(item.url)) {
          toast(`${item.name} has invalid url`)
          error = true
        }
      }
    }

    if(!error){
      updateUserData({
        ...userData,
        socialMediaUrls: JSON.stringify(socialMediaLink)
        },
        {
          onSuccess: () => {
            toast("Social medias updated correctly")
          },
          onError: (response) => {
            toast(response.response?.data.message || "Internal server error")
          }
        }
      )
    }

  }

  return (
    <div className="space-y-6 h-full">
        {
          socialMediaLink.map((item) => (
            <div className="flex gap-3 items-center bg-white px-4 py-2 shadow-md rounded-lg">
              <img src={`../../../../public/social/icon_${item.name}.svg`} className="max-w-10" alt="" />
              <input 
                name={item.name}
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
        <Button
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading? <Loader styles="border-white !p-2" /> : "Save changes"}
        </Button>
    </div>
  )
}
