import { useForm, Controller } from "react-hook-form";
import Input from "../../../components/ui/Input";
import FormAuth from "../../../components/auth/FormAuth";
import { InputsSigninT } from "../../../interfaces/User.interface";
import { Link, useNavigate } from "react-router-dom";
import { useSignin } from "../../../providers/Auth";
import { toast } from "react-toastify";
export default function Signin() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<InputsSigninT>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { mutate: signin, isLoading } = useSignin();

  const navigate = useNavigate()

  const onSubmit = (data: InputsSigninT) => {
    signin(data, {
      onSuccess: () => {
        toast("User logged in!");
        navigate('/')
      },
      onError: (response) => {
        toast(response.message);
      },
    });
  };

  return (
    <FormAuth
      titleForm={"Welcome back!"}
      subTitleForm={"Sign in to your DevTree account to continue"}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
        <Controller
          name="email"
          control={control}
          rules={{
            required: "E-mail addres is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Invalid E-mail",
            },
          }}
          render={({ field }) => (
            <Input
              type="text"
              placeHolder="E-mail"
              onChange={field.onChange}
              value={field.value}
              errorMessage={errors.email && errors.email.message}
              label="E-mail"
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
          }}
          render={({ field }) => (
            <Input
              type="password"
              placeHolder="Password"
              onChange={field.onChange}
              value={field.value}
              errorMessage={errors.email && errors.email.message}
              label="Password"
            />
          )}
        />

        <button
          disabled={isLoading}
          className="w-full text-center p-2 bg-mid-purple font-bold text-white rounded-lg cursor-pointer"
        >
          {isLoading ? "Loading..." : "Sign-in"}
        </button>
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            to={"/auth/signup"}
            className="text-black font-semibold cursor-pointer"
          >
            Create account
          </Link>
        </p>
      </form>
    </FormAuth>
  );
}
