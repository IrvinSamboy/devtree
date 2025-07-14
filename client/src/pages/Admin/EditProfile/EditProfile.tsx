import Button from "../../../components/ui/ButtonPurple"
import Input from "../../../components/ui/Input"
import { social } from "../../../data/social"
import { useEffect, useState } from "react"
import { devTreeLink } from "../../../interfaces/User.interface"
import { Switch } from '@headlessui/react'
import { Controller, useForm } from "react-hook-form"
import ImageUploadButton from "@/components/layout/appLayout/components/ImageUploadButton"
import ImageDragDrop from "@/components/layout/appLayout/components/ImageDragDrop"
import Loader from "@/components/utils/Loader"
import { useUpdateUserData, useUploadImage, useUserData } from "@/providers/User"
import { updateUserDataPayload } from "@/providers/User/user.interface"
import { typeImageEnum } from "@/providers/User/user.interface"
import { toast } from "react-toastify"

export default function EditProfile() {
  const {data: userData, isLoading} = useUserData()
  const {mutate: updateUserData, isLoading: isLoadingUserData} = useUpdateUserData()
  const {mutate: uploadImage, isLoading: isLoadingUploadImage} = useUploadImage()
  const [socialMediaLink, setSocialMediaLink] = useState<devTreeLink[]>(userData!.socialMediaUrls? JSON.parse(userData!.socialMediaUrls) : social)
  const [uploadedCoverImage, setUploadedCoverImage] = useState<File | string | null>(userData?.coverImage || null)
  const [profileImage, setProfileImage] = useState<File | string | null>(userData?.image || null)
  const {
          control,
          formState: {errors},
          register,
          handleSubmit,
          reset,
          setValue
        } = useForm<updateUserDataPayload>(
          {
            defaultValues: {
                  userName: '',
                  description: '',
            }
          }
      )
    
  useEffect(() => {
    if(userData){
      reset({
        userName: userData.userName,
        description: userData.description
      })
    }
  }, [userData])
  
  const handleCHangeURL = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSocialMediaLink(socialMediaLink.map(item => (
      item.name === e.target.name ? {
        ...item,
        url: e.target.value
      } :
        item
    )))
  }

  const handleChangeStatus = (socialName: string) => {
    setSocialMediaLink(socialMediaLink.map(item => (
      item.name === socialName ? {
        ...item,
        enabled: !item.enabled
      } :
        item
    )))
  }

  const onImageSelect = (file: File) => {
    setProfileImage(file)
  }

  const handleImageUpload = (
  image: File | string | null,
  userDataImage: string | undefined,
  type: typeImageEnum,
  setImage: (url: string) => void,
  fieldName: "image" | "coverImage"
) => {
  if (image && image !== userDataImage && typeof image !== "string") {
    console.log(image)
    uploadImage(
      {
        file: image,
        type: type
      },
      {
        onSuccess: (response) => {
          setImage(response.message)
        },
        onError: (response) => {
          toast(response.response?.data.message || `Error uploading ${fieldName}`)
        }
      }
    )
  }
}

  const onSubmit = (data: updateUserDataPayload) => {

    handleImageUpload(
      uploadedCoverImage,
      userData?.coverImage,
      typeImageEnum.COVER,
      setUploadedCoverImage,
      "coverImage"
    )

    handleImageUpload(
      profileImage,
      userData?.image,
      typeImageEnum.PROFILE,
      setProfileImage,
      "image"
    )
    updateUserData(
      {
        userName: data.userName,
        name: data.name,
        description: data.description,
        socialMediaUrls: JSON.stringify(socialMediaLink),
        ...(!profileImage && {image: ''}),
        ...(!uploadedCoverImage && {coverImage: ''})
      },
      {
        onSuccess: () => {
          toast("User profiled updated")
        },

        onError: (response) => {
          toast(response.response?.data.message || 'Error updating user')
        }
      }
    )
  }

  if(isLoading){
    return (
      <div className="h-screen">
        <Loader />
      </div>
    )
  }
  
  return (
    <div className="space-y-6 pb-4">
      <div className="flex w-full gap-4">
        <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">
          <div className="space-y-2 border-b border-gray-400 p-6">
            <h2 className="text-2xl font-bold">Basic Information</h2>
            <p className="text-gray-500">Update your profile details</p>
          </div>
          <div className=" p-6">
            <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
              <Controller 
                name="userName"
                control={control}
                rules={{
                  required: "User name is required",
                  }}
                render={({field}) => (
                <Input
                  label="Username"
                  type="text"
                  labelStyle="text-gray-700 font-base"
                  onChange={field.onChange}
                  value={field.value}
                  errorMessage={errors.userName && errors.userName.message}
                />
                )}
              />
               <div className="flex flex-col">
                <label htmlFor="" className="text-gray-700 font-medium">Description</label>
                <textarea id="" className="border rounded-lg h-74 resize-none border-gray-400" {...register("description")} ></textarea>
              </div>
              <Button>Save changes</Button>
            </form>
          </div>
        </div>

        <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">
          <div className="space-y-2 border-b border-gray-400 p-6">
            <h2 className="text-2xl font-bold">Profile images</h2>
            <p className="text-gray-500">Upload your profile and cover images</p>
          </div>
          <div className="p-6 space-y-4">
            <div>
              <label htmlFor=""></label>
              <div className="flex items-center gap-4">
                {
                  profileImage?
                      <img 
                        src={typeof profileImage === "string"? profileImage : URL.createObjectURL(profileImage)} 
                        className="rounded-full size-20 border border-gray-300 object-cover" 
                        alt="profileImage" 
                      />
                    :

                    <div className="bg-gray-400 px-7 py-6 rounded-full">
                          <p className="text-xl text-white font-semibold">{userData?.userName.slice(0,2) || "US"}</p>                
                    </div>
                }
                <ImageUploadButton
                  onImageSelect={onImageSelect}
                />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <label htmlFor="">Cover image</label>
              <ImageDragDrop
                uploadedCoverImage={uploadedCoverImage}
                setProfileImage={setUploadedCoverImage}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full shadow-lg border border-gray-300 rounded-lg">
        <div className="space-y-2 border-b border-gray-400 p-6">
          <h2 className="text-2xl font-bold">Social link</h2>
          <p className="text-gray-500">Connect your social media accounts</p>
        </div>
        <div className="grid grid-cols-2 gap-4 h-full p-6">
          {
            socialMediaLink.map((item, index) => (
              <div key={`socialMediaLink${index}`} className="flex gap-3 items-center bg-white px-4 py-2 border border-gray-300 rounded-lg">
                <img src={`/social/icon_${item.name}.svg`} className="max-w-10" alt="" />
                <input
                  name={item.name}
                  placeholder="Profile URL"
                  onChange={handleCHangeURL}
                  type="text"
                  value={item.url}
                  className="w-full border border-gray-300 p-2 rounded-lg outline-0" />
                <Switch
                  checked={item.enabled}
                  onChange={() => handleChangeStatus(item.name)}
                  className={`${item.enabled ? 'bg-blue-500' : 'bg-gray-200'} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
                >
                  <span
                    aria-hidden="true"
                    className={`${item.enabled ? 'translate-x-5' : 'translate-x-0'} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                  />
                </Switch>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  )
}
