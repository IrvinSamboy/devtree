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
            className={`flex gap-3 items-center cursor-pointer px-4 py-1 rounded-lg
            ${location.pathname === path ? 'text-black bg-white' : 'text-gray-500'}`}
        >
            {children}
            <p>{tabName}</p>
        </div>
    )
}
