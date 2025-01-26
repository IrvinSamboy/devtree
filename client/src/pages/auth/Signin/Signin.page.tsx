import Logo from "../../../components/utils/Logo"
import { useForm, Controller } from 'react-hook-form'
import Input from "../../../components/ui/Input"

interface InputsI {
  email: string,
  password: string
}

export default function Signin() {

  const { handleSubmit, formState: {errors}, control } = useForm<InputsI>()
  
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
            <Controller
              name="email"
              control={control}
              rules={
                { 
                  required : 'E-mail addres is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "Invalid E-mail",
                  }
                }
              }
              render={({field}) => 
                <Input 
                  type="text"
                  placeHolder="E-mail"
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={errors.email && errors.email.message}
                  label="E-mail"
                />
              }
            />
            <Controller
              name="password"
              control={control}
              rules={
                { 
                  required : 'Password is required'
                }
              }
              render={({field}) => 
                <Input 
                  type="text"
                  placeHolder="Password"
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={errors.email && errors.email.message}
                  label="Password"
                />
              }
            />
            
            <button className='w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg cursor-pointer'>Sign-in</button>
            <p className="text-gray-600">Don't have an account? <span className="text-black font-semibold cursor-pointer">Create account</span></p>
          </form>
        </div>
      </div>
      <div className={`bg-[url('/public/images/loginBackground.jpg')] bg-cover bg-no-repeat`}></div>

    </section>
  )
}
