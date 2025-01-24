import { Code2 } from "lucide-react"

export default function Signin() {
  return (
    <section className="grid grid-cols-2 size-full">

      <div className="flex justify-center flex-col size-full items-center space-y-4">
        <div className="w-[70%] flex flex-col items-center justify-center bg-white p-8 rounded-xl shadow-xl">
          <header className="w-full flex gap-3 text-mid-purple py-3">
            <Code2 />
            <p className="font-semibold text-xl">DEVTREE</p>
          </header>

          <div className='space-y-1 w-full mb-4'>
            <h1 className='text-2xl font-semibold'>Welcome back!</h1>
            <p className='text-gray-600 text-md font-light'>Sign in to your DevTree account to continue</p>
          </div>

          <form action="" className='w-full space-y-5'>
            <div className="flex flex-col space-y-1">
              <label htmlFor="">Email</label>
              <input
                className='bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black'
                type="text"
                placeholder='E-mail'
              />
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between">
              <label htmlFor="">Password</label>
              <p className="font-light text-mid-purple">Forgot password?</p>
              </div>
              <input
                className='bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black'
                type="text"
                placeholder='password'
              />
            </div>
            <button className='w-full text-center p-4 bg-mid-purple font-bold text-white rounded-lg'>Sign-in</button>

          </form>
        </div>
      </div>
      <div className={`bg-[url('/public/images/loginBackground.jpg')] bg-cover bg-no-repeat`}></div>

    </section>
  )
}
