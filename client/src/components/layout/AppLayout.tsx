
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import Logo from "../utils/Logo"
import { Link, User } from "lucide-react"

export default function AppLayout() {

    const location = useLocation()
    const navigate = useNavigate()

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
                    <div 
                        onClick={() => navigate('/admin')}
                        className={`flex gap-3 items-center py-2 hover:text-mid-purple cursor-pointer border-b-2 
                        ${location.pathname === '/admin'? 'text-mid-purple': 'border-transparent'}`}
                    >
                        <Link />
                        <p>Links</p>    
                    </div>
                    <div
                        onClick={() => navigate('profile')} 
                        className={`flex gap-3 items-center py-2 hover:text-mid-purple cursor-pointer border-b-2 
                            ${location.pathname === '/admin/profile'? 'text-mid-purple': 'border-transparent'}`}
                    >
                        <User />
                        <p>Profile</p>
                    </div>
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
