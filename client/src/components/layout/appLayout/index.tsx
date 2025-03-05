
import { Outlet } from "react-router-dom"
import Logo from "../../utils/Logo"
import { Link, User } from "lucide-react"
import TabElement from "./components/TabElement"
import { useUserData } from "../../../providers/User"
import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Loader from "../../utils/Loader"

export default function AppLayout() {

const {data : userData, isLoading, refetch, isError} = useUserData()

const location = useLocation()

useEffect(() => {
    if(location.pathname === '/admin/profile') {
        refetch()
    }
}, [location.pathname])

if(isLoading) {
    return <Loader />
}

else if(isError) {
    return <p>ERROR</p>
}

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
        <main className="grid grid-cols-[3fr_2fr] gap-3 max-w-[90%] mx-auto">
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
                <h2 className="text-xl font-semibold">Visit my profile/{userData?.userName}</h2>
                <div className="p-4 text-gray-500">
                    <div className="bg-gradient-to-r from-emerald-500 to-teal-400 w-full h-32 rounded-t-lg"></div>
                    <div className="px-4 py-8 border-gray-300 border border-t-0 space-y-4">
                        <div className="flex gap-4 items-center">
                            <div>
                                {userData?.image?
                                    <img src={userData.image} className="max-w-28 rounded-full" alt="" />
                                    :
                                    <div className="size-28 rounded-full bg-gray-200"></div>
                                }
                            </div>
                            <div>
                                <p className="text-2xl font-semibold">{userData?.name}</p>
                                <p className="text-lg">{userData?.userName}</p>
                            </div>
                        </div>
                        <p className="text-xl">{userData?.description}</p>

                    </div>
                </div>
            </section>
        </main>
    </div>

  )
}
