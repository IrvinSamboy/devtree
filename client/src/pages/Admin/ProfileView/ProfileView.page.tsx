import { useState } from "react"
import Input from "../../../components/ui/Input"
import { useUpdateUserData, useUserData } from "../../../providers/User"
import Loader from "../../../components/utils/Loader"
import Button from "../../../components/ui/Button"
import { useForm, Controller } from "react-hook-form"
import { userData } from "../../../providers/User/user.interface"
import { toast } from "react-toastify"
export default function ProfileView() {

  const [drag, setDrag] = useState(false)

  const { data: userData, isError, isLoading } = useUserData()

  const {mutate: updateUserData, isLoading: isLoadingUpdate} = useUpdateUserData()

  const defautValues = {
    userName: userData?.userName || '',
    name: userData?.name || '',
    email: userData?.email || '',
    description: userData?.description || ''
  }

  const { 
          control,
          register,
          formState:{errors}, 
          handleSubmit 
  } = useForm<userData>({
    defaultValues: defautValues
  })

  const onSubmit = (data : userData) => {
    updateUserData(data, {
      onSuccess: () => {
        toast("User data updated")
      },
      onError: (response) => {
        toast(response.response?.data.message || "Internal server error")
      }
    })
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("drop")
  }
  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }
  return (

    <div className="bg-white p-4 rounded-lg shadow-lg">
      {isLoading ?
        <Loader />
        :
        isError ?
          <p>ERROR</p>
          :
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-center text-xl font-semibold">Edit information</h2>
            <div className="space-y-2">
              <Controller 
                control={control}
                name="userName"
                rules={
                  {
                    required: "user name is required"
                  }
                }
                render={({field}) => (
                  <Input
                    placeHolder="User name"
                    value={field.value}
                    onChange={field.onChange}
                    label="User name"
                    type="text"
                    errorMessage={errors.userName && errors.userName.message}
                  />
                )}
              />
              <Controller 
                control={control}
                name="email"
                rules={
                  {
                    required: "E-mail is required"
                  }
                }
                render={({field}) => (
                  <Input
                    placeHolder="E-mail"
                    value={field.value}
                    onChange={field.onChange}
                    label="email"
                    type="text"
                    errorMessage={errors.email && errors.email.message}
                  />
                )}
              />
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Description</label>
                <textarea 
                  {...register("description")}
                  className="bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black"
                ></textarea>
              </div>
              <div className="space-y-1">
                <p>Image</p>
                <div className={`py-10 px-4 border-mid-purple border rounded-lg ${drag && 'bg-mid-purple/50'}`} onDragLeave={handleOnDragEnd} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
                  <p className="text-center text-xl text-gray-500">Drag a image here to upload or <br /><span className="text-lg border-b ">CLick here to browse</span></p>
                </div>
              </div>
              <Button
                disabled={isLoading}
              >
                {isLoadingUpdate ? <Loader styles="border-white !p-2" /> : "Send"}
              </Button>
            </div>
          </form>
      }
    </div>
  )
}
