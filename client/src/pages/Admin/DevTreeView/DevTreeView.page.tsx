import React, { useState } from "react"
import { social } from "../../../data/social"
import { devTreeLink } from "../../../interfaces/User.interface"
import { Switch } from '@headlessui/react'

export default function DevTreeView() {
  
  const [socialMediaLink, setSocialMediaLink] = useState<devTreeLink[]>(social)

  const handleCHangeURL = (e : React.ChangeEvent<HTMLInputElement>) => {
    setSocialMediaLink(socialMediaLink.map(item => item.name === e.target.name? {...item, url: e.target.value } : item))
  }

  return (
    <div className="space-y-6">
        {
          socialMediaLink.map((item) => (
            <div className="flex gap-3 items-center bg-white p-4 shadow-md rounded-lg">
              <img src={`../../../../public/social/icon_${item.name}.svg`} className="max-w-14" alt="" />
              <input 
                name={item.name}
                onChange={handleCHangeURL}
                type="text" 
                value={item.url}
                className="w-full border border-gray-300 p-2 rounded-lg outline-0" />
              <Switch
                  checked={item.enabled}
                  onChange={() => {}}
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
  )
}
