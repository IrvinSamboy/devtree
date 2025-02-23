import Input from "../../../components/ui/Input"
import FormAuth from "../../../components/auth/FormAuth"
import { useForm, Controller } from 'react-hook-form'
import { InputsSignupT } from "../../../interfaces/User.interface"
import { useSignUp } from "../../../providers/Auth"
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"
import Button from "../../../components/ui/Button"
import Loader from "../../../components/utils/Loader"

export default function Signup() {

    const navigate = useNavigate()

    const { handleSubmit, formState: { errors }, control } = useForm<InputsSignupT>(
        {
            defaultValues: {
                username: '',
                name: '',
                email: '',
                password: ''
            }
        }
    )
    const { mutate: signUp, isLoading } = useSignUp()

    const onSubmit = (data: InputsSignupT) => {
        signUp(data, {
            onSuccess: () => {
                toast("User register correctly")
                navigate('/auth/signin')
            },
            onError: (response) => {
                toast(response.response?.data.message || 'Internal server error');
            },
        })
    }

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
                            required: 'E-mail address is required',
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
                <Button
                    disabled={isLoading}
                >
                    {isLoading ? <Loader styles="border-white !p-2" /> : "Sign-up"}
                </Button>

            </form>
        </FormAuth>
    )
}
