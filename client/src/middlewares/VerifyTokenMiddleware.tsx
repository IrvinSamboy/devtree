import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useVerifySessionToken } from "../providers/Auth"
import { useEffect, useMemo } from "react"
import Loader from "../components/utils/Loader"

export default function VerifyTokenMiddleware() {

    const { isLoading, isError, refetch } = useVerifySessionToken()

    const location = useLocation()

    const userAuthenticated = useMemo(
        () => {
           return !isError
        }, [isError]
    )
 
    useEffect(()=> {
        refetch()
    }, [location.pathname])
    
    
    if(location.pathname === '/auth/signin') {
        return <Outlet/>
    }

    if(isLoading) {
        return <Loader />
    }
    
    else if(userAuthenticated) {
        return <Outlet/>
    }


    return <Navigate to='/auth/signin'/>
}
