import Input from "../../../components/ui/Input"
import FormAuth from "../../../components/auth/FormAuth"

export default function Signup() {
  return (
    <FormAuth
      titleForm={'Join DevTree!'}
      subTitleForm={'Sign up for free!'}
    >
        <form className='w-full space-y-5'>
            <Input
                type="text"
                placeHolder="userName"
                label="User name"
            />
            <Input
                type="text"
                placeHolder="name"
                label="Name"
            />
            <Input
                type="text"
                placeHolder="E-mail"
                label="E-mail"
            />
            <Input
                type="password"
                placeHolder="Password"
                label="password"
            />

            <button className='w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg cursor-pointer'>Sign-up</button>
        </form>
    </FormAuth>
  )
}
