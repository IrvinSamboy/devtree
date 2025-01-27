import { ReactNode } from "react"
import Logo from "../utils/Logo"

export default function FormAuth({children} : {children : ReactNode}) {
  return (
    <section className="grid grid-cols-2 size-full">

      <div className="flex justify-center flex-col size-full items-center space-y-4">
        <div className="w-[70%] flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-xl">
          <header className="w-full py-3">
            <Logo />
          </header>

          <div className='space-y-1 w-full mb-4'>
            <h1 className='text-2xl font-semibold'>Welcome back!</h1>
            <p className='text-gray-600 text-md font-light'>Sign in to your DevTree account to continue</p>
          </div>

          {children}
        </div>
      </div>
      <div className={`bg-[url('/public/images/loginBackground.jpg')] bg-cover bg-no-repeat`}></div>

    </section>
  )
}

