
import { Outlet } from "react-router-dom"
import Logo from "../../utils/Logo"
import { Edit, Link, User } from "lucide-react"
import TabElement from "./components/TabElement"
import { useUserData } from "../../../providers/User"
import { useEffect } from "react"
import Loader from "../../utils/Loader"

export default function AppLayout() {

    const { data: userData, isLoading, refetch, isError } = useUserData()

    useEffect(() => {
        refetch()
    }, [])

    if (isLoading) {
        return <Loader />
    }

    else if (isError) {
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
            <section className="space-y-4 max-w-[90%] mx-auto">
                <div className="flex">
                    <div className="flex text-black text-sm items-center bg-gray-200 rounded-lg p-1">
                        <TabElement
                            tabName='Edit profile'
                            path='/admin'
                        >
                            <Edit />
                        </TabElement>
                        <TabElement
                            tabName='Profile view'
                            path='/admin/profile'
                        >
                            <User />
                        </TabElement>
                    </div>
                </div>
                <Outlet />
            </section>
        </div>

    )
}
