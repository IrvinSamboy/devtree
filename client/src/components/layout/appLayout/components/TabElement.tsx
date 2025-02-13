import { ReactNode } from "react"
import { useLocation, useNavigate } from "react-router-dom"

type TabElementProps = {
    children: ReactNode,
    tabName: string,
    path: string
}

export default function TabElement({ children, tabName, path } : TabElementProps) {

    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div
            onClick={() => navigate(path)}
            className={`flex gap-3 items-center py-2 hover:text-mid-purple cursor-pointer border-b-2 
    ${location.pathname === path ? 'text-mid-purple' : 'border-transparent'}`}
        >
            {children}
            <p>{tabName}</p>
        </div>
    )
}
