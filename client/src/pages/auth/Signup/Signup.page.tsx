import Input from "../../../components/ui/Input"
import FormAuth from "../../../components/auth/FormAuth"
import { useForm, Controller } from 'react-hook-form'
import { InputsSignupT } from "../../../interfaces/User.interface"

export default function Signup() {

    const { handleSubmit, formState: { errors }, control } = useForm<InputsSignupT>()

    const onSubmit = (data: InputsSignupT) => console.log(data)

    return (
        <FormAuth
            titleForm={'Join DevTree!'}
            subTitleForm={'Sign up for free!'}
        >
            <form className='w-full space-y-5' onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="username"
                    control={control}
                    rules={
                        {
                            required: "User name is required",
                        }
                    }
                    render={({ field }) =>
                        <Input
                            type="text"
                            placeHolder="userName"
                            onChange={field.onChange}
                            value={field.value}
                            errorMessage={errors.username && errors.username.message}
                            label="User name"
                        />
                    }
                />
                <Controller
                    name="name"
                    control={control}
                    rules={
                        {
                            required: "Name is required",
                        }
                    }
                    render={({ field }) =>
                        <Input
                            type="text"
                            placeHolder="name"
                            onChange={field.onChange}
                            value={field.value}
                            errorMessage={errors.name && errors.name.message}
                            label="Name"
                        />
                    }
                />
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
                            type="password"
                            placeHolder="Password"
                            onChange={field.onChange}
                            value={field.value}
                            errorMessage={errors.email && errors.email.message}
                            label="Password"
                        />
                    }
                />

                <button className='w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg cursor-pointer'>Sign-up</button>
            </form>
        </FormAuth>
    )
}
