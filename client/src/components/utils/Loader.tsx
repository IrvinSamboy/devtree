export default function Loader({styles = ''} : {styles? : string}) {
  return (
    <div className="flex h-full items-center justify-center">
        <div className={`border-4 rounded-full border-mid-purple p-10 border-b-trasparent
         border-r-transparent animate-spin ${styles}`}></div>
    </div>
  )
}
