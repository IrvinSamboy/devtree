import Input from "../../../components/ui/Input"
export default function EditProfile() {
  return (
    <div className="grid grid-cols-2">
      <div className="bg-white shadow-lg border border-gray-300 rounded-lg p-6 space-y-4">
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Basic Information</h2>
          <p className="text-gray-500">Update your profile details</p>
        </div>

        <div>
          <Input 
            label="Username"
            type="text"
            labelStyle=""
            errorMessage="You need add a use name"
          />
          <div>
            <label htmlFor=""></label>
            <textarea name="" id=""></textarea>
          </div>
        </div>

      </div>

      <div>
        <div>
          <h2></h2>
          <p></p>
        </div>
        <div>
          <div>
            <label htmlFor=""></label>
            <div>
              <p></p>
              <button></button>
            </div>
          </div>
          <div>
            <label htmlFor=""></label>
            <div>
              <p><span></span></p>
            </div>
          </div>
        </div>
      </div>    
    </div>
  )
}
