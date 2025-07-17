import Loader from "@/components/utils/Loader"
import { useUserData } from "@/providers/User"

export default function ProfileView() {
  const { data: userData, isLoading } = useUserData()

  if (isLoading) {
    return (
      <div className="h-screen">
        <Loader />
      </div>
    )
  }

  return (
    <div className=" rounded-3xl">
      <div className="bg-emerald-400 h-32 rounded-t-3xl">
      </div>
      <div>
        {
          userData?.image ?
            <img
              src={userData.image}
              className="rounded-full size-50 border border-gray-300 object-cover"
              alt="profileImage"
            />
            :
            <div className="flex">
              <div className="bg-gray-400 px-15 py-14 rounded-full">
                <p className="text-4xl text-white font-semibold">EL</p>
              </div>
            </div>
        }

        <p>{userData?.userName}</p>
        <p>{userData?.description}</p>
      </div>
    </div>
  )
}
