
import { Outlet } from "react-router-dom"
import Logo from "../utils/Logo"

export default function AppLayout() {
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
            <section>
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
