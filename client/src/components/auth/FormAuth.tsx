import { ReactNode } from "react"
import Logo from "../utils/Logo"

export default function FormAuth({children, titleForm, subTitleForm} : {children : ReactNode, titleForm: string, subTitleForm: string}) {
  return (
    <section className="grid lg:grid-cols-2 size-full">

      <div className="flex justify-center flex-col size-full items-center space-y-2">
        <div className="w-[70%] flex flex-col items-center justify-center bg-white p-5.5 rounded-xl shadow-xl">
          <header className="w-full py-1 lg:py-3">
            <Logo />
          </header>

          <div className='space-y-1 w-full mb-2 lg:mb-4'>
            <h1 className='text-xl lg:text-2xl font-semibold'>{titleForm}</h1>
            <p className='text-gray-600 text-md font-light'>{subTitleForm}</p>
          </div>

          {children}
          
        </div>
      </div>
      <div className={`hidden lg:block bg-[url('/public/images/loginBackground.jpg')] bg-cover bg-no-repeat`}></div>

    </section>
  )
}

