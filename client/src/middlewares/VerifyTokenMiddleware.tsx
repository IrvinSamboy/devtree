import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useVerifySessionToken } from "../providers/Auth"
import { useMemo } from "react"
import Loader from "../components/utils/Loader"

export default function VerifyTokenMiddleware() {

    const { isLoading, isError, refetch } = useVerifySessionToken()

    const location = useLocation()

    const userAuthenticated = useMemo(
        () => {
           refetch()
           return !isError
        }, [location.pathname]
    )

    console.log(userAuthenticated)

    if(isLoading) {
        return <Loader />
    }
    
    else if(userAuthenticated) {
        return <Outlet/>
    }


    return <Navigate to='/auth/signin'/>
}
