import Input from "../../../components/ui/Input"

export default function ProfileView() {
  return (
    <div className="bg-white p-4">
      <h2 className="text-center text-xl font-semibold">Edit information</h2>
      <div className="space-y-2">
        <Input
            placeHolder="User name"
            label = "User name"
            type = "text"
        />
        <Input
            placeHolder="email"
            label = "Email"
            type = "text"
        />
      </div>
    </div>
  )
}
