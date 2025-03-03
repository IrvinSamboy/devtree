
import { Outlet } from "react-router-dom"
import Logo from "../../utils/Logo"
import { Link, User } from "lucide-react"
import TabElement from "./components/TabElement"
import { useUserData } from "../../../providers/User"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export default function AppLayout() {

const {data : userData, isLoading, refetch, isError} = useUserData()

const location = useLocation()

useEffect(() => {
    if(location.pathname === '/admin/profile') {
        refetch()
    }
}, [location.pathname])

return (
    <div className="space-y-5">
        <header className="bg-white p-2 w-full shadow-2xl">
           <div className="flex justify-between max-w-[90%] mx-auto">
            <Logo />
                <button className="border-mid-purple/50 border px-2 py-1 rounded-sm hover:bg-mid-purple hover:text-white cursor-pointer">
                    Log-Out
                </button>
           </div>
        </header>
        <main className="grid grid-cols-2 gap-3 max-w-[90%] mx-auto">
            <section className="space-y-4">
                <div className="flex text-black items-center gap-10">
                    <TabElement 
                        tabName='Links'
                        path='/admin'
                    >
                        <Link />
                    </TabElement>
                    <TabElement 
                        tabName='Profile'
                        path='/admin/profile'
                    >
                        <User />
                    </TabElement>
                </div>
                <Outlet />
            </section>
            <section className="space-y-3">
                <h2 className="text-xl font-semibold">Visit my profile</h2>
                <div className="bg-emerald-green p-4">
                    
                </div>
            </section>
        </main>
    </div>

  )
}
