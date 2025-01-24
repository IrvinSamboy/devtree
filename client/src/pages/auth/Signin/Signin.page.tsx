
export default function Signin() {
  return (
    <section className="grid grid-cols-2 size-full">

      <div className="size-full flex flex-col h-full items-center">
        <header className="w-full p-9">
          <p className="font-light text-xl">DEV<span className="font-semibold text-mid-purple">TREE</span></p>
        </header>
        <div className='flex justify-center flex-col size-full items-center space-y-4'>

          <div className='text-center space-y-2'>
            <h1 className='text-5xl font-semibold'>Welcome back!</h1>
            <p className='text-gray-600 text-xl font-light'>Log in your DevTree</p>
          </div>

          <form action="" className='w-[85%] p-4 space-y-6'>
            <input
              className='bg-gray-200 w-full p-2 rounded-xl outline-none border-2 border-transparent focus:border-mid-purple'
              type="text"
              placeholder='E-mail'
            />

            <input
              className='bg-gray-200 w-full p-2 rounded-xl outline-none border-2 border-transparent focus:border-mid-purple'
              type="text"
              placeholder='password'
            />

            <button className='w-full text-center p-4 bg-mid-purple font-bold text-white rounded-full'>Sign-in</button>

          </form>
        </div>
      </div>
      <div className={`bg-[url('/public/images/loginBackground.jpg')] bg-cover bg-no-repeat`}></div>

    </section>
  )
}
