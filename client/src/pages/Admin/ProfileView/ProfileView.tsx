import { useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Edit, Eye, LogOut, ExternalLink, MapPin, Calendar, Share2, Heart, MessageCircle } from "lucide-react"
import Loader from "@/components/utils/Loader"
import { useUserData } from "@/providers/User"

// Local fallback ‒ delete if you already have this type elsewhere
type devTreeLink = {
  name: string
  url: string
  enabled: boolean
}

export default function ProfileView() {
  const { data: userData, isLoading } = useUserData()

  const socialMediaUrl: devTreeLink[] = useMemo(
    () =>
      userData?.socialMediaUrls
        ? JSON.parse(userData.socialMediaUrls).filter((item: devTreeLink) => item.enabled && item.url && item)
        : null,
    [userData],
  )

  if (isLoading) {
    return (
      <div className="h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <Loader />
      </div>
    )
  }

  const getInitials = (name: string) => {
    return (
      name
        ?.split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase() || "EL"
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">

      <Card className="overflow-hidden shadow-2xl border-0">
        {/* Cover Image */}
        <div className="relative h-64 sm:h-80 ">
          {userData?.coverImage ? (
            <img
              src={userData.coverImage || "/placeholder.svg"}
              alt="Cover image"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-r from-emerald-400 via-emerald-500 to-emerald-600"></div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

          {/* Action buttons overlay */}
          <div className="absolute top-4 right-4 flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90 backdrop-blur-sm">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Profile Picture */}
          <div className="absolute -bottom-16 left-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-xl overflow-hidden bg-white">
                {userData?.image ? (
                  <img
                    src={userData.image || "/placeholder.svg"}
                    alt="Profile image"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-slate-400 to-slate-500 flex items-center justify-center">
                    <span className="text-4xl text-white font-semibold">{getInitials(userData?.userName || "")}</span>
                  </div>
                )}
              </div>
       
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <CardContent className="pt-20 pb-8 px-8">
          <div className="space-y-6">
            {/* User Info */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
              <div className="space-y-3">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">{userData?.userName}</h1>
                </div>

                {/* Social Media Links */}
                {socialMediaUrl && socialMediaUrl.length > 0 && (
                  <div className="flex gap-3">
                    {socialMediaUrl.map((item, index) => (
                      <a
                        key={index}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative"
                      >
                        <div className="w-12 h-12 rounded-full bg-slate-100 hover:bg-slate-200 transition-all duration-200 flex items-center justify-center group-hover:scale-110 group-hover:shadow-lg">
                          <img src={`/social/icon_${item.name}.svg`} alt={item.name} className="w-6 h-6" />
                        </div>
                        <ExternalLink className="absolute -top-1 -right-1 w-3 h-3 text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </a>
                    ))}
                  </div>
                )}

                {/* Skills/Tags */}

              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button className="bg-mid-purple hover:bg-mid-purple/90 cursor-pointer">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  View profile
                </Button>
              </div>
            </div>

            {/* Description */}
            {userData?.description && (
              <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                <h2 className="text-lg font-semibold mb-3 text-slate-900">About</h2>
                <p className="text-slate-700 leading-relaxed">{userData.description}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
