import { useEffect, useRef, useState } from "react"
import Input from "../../../components/ui/Input"
import { useUpdateUserData, useUploadImage, useUserData } from "../../../providers/User"
import Loader from "../../../components/utils/Loader"
import Button from "../../../components/ui/Button"
import { useForm, Controller } from "react-hook-form"
import { updateUserDataPayload } from "../../../providers/User/user.interface"
import { toast } from "react-toastify"
export default function ProfileView() {

  const [drag, setDrag] = useState(false)

  const [fileURL, setFIleURL] = useState("")

  const [fileErr, serFileErr] = useState(false)

  const fileObj = useRef<File>()

  const { data: userData, isError, isLoading, refetch } = useUserData()

  const { mutate: updateUserData, isLoading: isLoadingUpdate } = useUpdateUserData()

  const {mutate: uploadImage, isLoading: isLoadingUpload} = useUploadImage()

  const handleUploadImage = () => {
    uploadImage(fileObj, {
      onSuccess: () => {
        toast("Image uploaded correctly")
      },
      onError: (response) => {
        toast(response.response?.data.message)
      }
    })
  }

  const defaultValues = {
    userName: '',
    description: '',
    name: ''
  }

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
    reset
  } = useForm<updateUserDataPayload>({
    defaultValues: defaultValues
  })

  useEffect(()=> {
    reset(userData)
  }, [userData])

  const onSubmit = (data: updateUserDataPayload) => {
    updateUserData(data, {
      onSuccess: () => {
        toast("User data updated")
        refetch()
      },
      onError: (response) => {
        toast(response.response?.data.message || "Internal server error")
      }
    })
  }


  useEffect(() => console.log(fileURL), [fileURL])

  const fileInput = useRef<HTMLInputElement>(null)

  const fileValidator = (file: File) => {
    if(!file.type.includes("image")) {
      serFileErr(true)
    }
    else if(file) {
      setFIleURL(URL.createObjectURL(file))
      serFileErr(false)
      fileObj.current = file
    }
  }

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const droppedFiles = e.dataTransfer.files;
    const file = droppedFiles[0]
    fileValidator(file)
    setDrag(false)
  }
  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(true)
  }
  const handleOnDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setDrag(false)
  }

  const clickFileInput = () => {
    fileInput.current?.click()
  }

  const onChangeFileInput = (e : React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0]
    fileValidator(file)
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
                render={({ field }) => (
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
              <div className="flex flex-col space-y-1">
                <label htmlFor="">Description</label>
                <textarea
                  {...register("description")}
                  className="bg-transparent w-full p-1.5 rounded-lg outline-none border-1 border-gray-400 focus:border-black"
                ></textarea>
              </div>
              <div className="space-y-1">
                <p>Image</p>
                <div className={`py-10 px-4 border-mid-purple border flex items-center justify-center flex-col rounded-lg ${drag && 'bg-mid-purple/50'}`} onDragLeave={handleOnDragEnd} onDragOver={handleOnDragOver} onDrop={handleOnDrop}>
                  <p className="text-center text-xl text-gray-500">
                    Drag a image here to upload or <br />
                    <span className="cursor-pointer text-lg border-b" onClick={clickFileInput}>CLick here to browse</span>
                    {fileErr&&
                      <>
                        <br />
                        <span className="text-center text-base text-red-500">Invalid file type, only accept image</span>
                      </>
                    }
                    </p>
                  <img hidden={!fileURL} src={fileURL} alt="" className="size-[50%] mt-5" />
                  <Button 
                    onClick={handleUploadImage}
                    styles={`!bg-emerald-green mt-5 !w-1/2 ${!fileURL&& "hidden"}`}>
                    Upload image
                  </Button>
                </div>
                <input type="file" multiple={false} accept="image/*" onChange={onChangeFileInput} hidden={true} ref={fileInput}/>
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
