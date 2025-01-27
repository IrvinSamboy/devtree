import { useForm, Controller } from 'react-hook-form'
import Input from "../../../components/ui/Input"
import FormAuth from "../../../components/auth/FormAuth"
interface InputsI {
  email: string,
  password: string
}

export default function Signin() {

  const { handleSubmit, formState: { errors }, control } = useForm<InputsI>()

  const onSubmit = (data: InputsI) => console.log(data)


  return (
    <FormAuth
      titleForm={'Welcome back!'}
      subTitleForm={'Sign in to your DevTree account to continue'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className='w-full space-y-5'>
        <Controller
          name="email"
          control={control}
          rules={
            {
              required: 'E-mail addres is required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Invalid E-mail",
              }
            }
          }
          render={({ field }) =>
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
              required: 'Password is required'
            }
          }
          render={({ field }) =>
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
    </FormAuth>

  )
}
