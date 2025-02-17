import Input from "../../../components/ui/Input"

export default function ProfileView() {
  
  const handleOnDrop = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("drop")
  }
  const handleOnDras = (e : React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    console.log("drag")
  }
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
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
        <div onDragOver={handleOnDras} onDrop={handleOnDrop}>
          <p>hi</p>
        </div>
      </div>
    </div>
  )
}
