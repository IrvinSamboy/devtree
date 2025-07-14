import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useVerifySessionToken } from "../providers/Auth"
import { useEffect, useMemo, useState } from "react"
import Loader from "../components/utils/Loader"

export default function VerifyTokenMiddleware() {

    const { isLoading, isError, refetch } = useVerifySessionToken()
    const [checking, setChecking] = useState(true)
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
            location.state.skipMiddleware = false
            return
        }

        const verify = async () => {
            setChecking(true)
            await refetch()
            setChecking(false)
        }

        verify()
    }, [location.pathname])
    
    if(checking) {
        return ( 
            <div className="h-screen">
                <Loader />
            </div>
        )
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
