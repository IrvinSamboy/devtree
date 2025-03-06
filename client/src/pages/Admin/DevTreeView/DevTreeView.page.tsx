import { useState } from "react"
import { social } from "../../../data/social"
import { devTreeLink } from "../../../interfaces/User.interface"

export default function DevTreeView() {
  
  const [socialMediaLink, setSocialMediaLink] = useState<devTreeLink>(social)

  return (
    <div>
        <p>DevTreeView</p>      
    </div>
  )
}
