import Logo from "../../../components/utils/Logo"
import { useForm } from 'react-hook-form'

interface InputsI {
  email: string,
  password: string
}

export default function Signin() {

  const { register, handleSubmit, formState: {errors} } = useForm<InputsI>()
  
  const onSubmit = (data : InputsI) => console.log(data)


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

          <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-5'>
            <div className="flex flex-col space-y-1">
              <label htmlFor="">Email</label>
              <input
                className={`bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black ${errors.email&& 'border-red-500'}`}
                type="text"
                placeholder='E-mail'
                { ...register('email', {
                  required : 'E-mail addres is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid E-mail",
                  }
                })}
              />
              {errors.email&& <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <div className="flex flex-col space-y-1">
              <div className="flex justify-between">
              <label htmlFor="">Password</label>
              <p className="font-light text-mid-purple cursor-pointer">Forgot password?</p>
              </div>
              <input
                className={`bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black ${errors.email&& 'border-red-500'}`}
                type="text"
                placeholder='password'
                {...register('password',{
                  required: 'Password is required'
                })}
              />
              {errors.email&& <p className="text-red-500">{errors.email.message}</p>}
            </div>
            <button className='w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg cursor-pointer'>Sign-in</button>
            <p className="text-gray-600">Don't have an account? <span className="text-black font-semibold cursor-pointer">Create account</span></p>
          </form>
        </div>
      </div>
      <div className={`bg-[url('/public/images/loginBackground.jpg')] bg-cover bg-no-repeat`}></div>

    </section>
  )
}
