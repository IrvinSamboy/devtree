import { Link } from "react-router-dom";

export default function Page404() {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className="flex flex-col items-center justify-center space-y-5">
        <h1 className="text-mid-purple font-bold text-8xl">404</h1>
        <h2 className="font-semibold text-emerald-green text-4xl">Page Not Found</h2>
        <p className="text-gray-500 font-medium text-xl">Oops! The page you're looking for doesn't exist.</p>
        <Link
            to='/' 
            className="text-center py-2 px-4 bg-mid-purple font-bold text-white rounded-lg cursor-pointer"
        >
            Return Home
        </Link>
      </div>
    </div>
  )
}
