import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useVerifySessionToken } from "../providers/Auth"
import { useEffect, useMemo } from "react"
import Loader from "../components/utils/Loader"

export default function VerifyTokenMiddleware() {

    const { isLoading, isError, refetch } = useVerifySessionToken()

    const location = useLocation()

    const userAuthenticated = useMemo(
        () => {
            if(location.state?.skipMiddleware){
                return true
            }    
           return !isError
        }, [isError, location.state?.skipMiddleware]
    )
 
    useEffect(()=> {
        if(location.state?.skipMiddleware){
            console.log(location.state)
            location.state.skipMiddleware = false
            return
        }
        refetch()
    }, [location.pathname])
    
    if(isLoading) {
        return <Loader />
    }

    else if(location.pathname.includes('/auth')) {
        if(userAuthenticated) {
            return <Navigate to='/'/>
        }
        return <Outlet/>
    }
    
    else if(userAuthenticated) {
        return <Outlet/>
    }


    return <Navigate to='/auth/signin'/>
}
