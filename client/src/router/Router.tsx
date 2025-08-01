import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "../pages/auth/Signin/Signin.page"
import RootLayout from "../components/layout/RootLayout"
import Signup from "../pages/auth/Signup/Signup.page"
import AppLayout from "../components/layout/appLayout"
import EditProfile from "../pages/Admin/EditProfile/EditProfile"
import ProfileView from "../pages/Admin/ProfileView/ProfileView"
import Loader from "../components/utils/Loader"
import Page404 from "../pages/404/Page404.page"
import VerifyTokenMiddleware from "../middlewares/VerifyTokenMiddleware"

export default function Router() {
  return (
    <BrowserRouter >
      <Routes>
        <Route element={<VerifyTokenMiddleware />}>

          <Route path="*" element={<Page404 />} />

          <Route
            element={<RootLayout />}
          >    
            <Route
              path="/"
              element={<Loader />}
            />
            <Route
              path="/auth/"
            >
              <Route
                path="signin"
                element={<Signin />}
              />
              <Route
                path="signUp"
                element={<Signup />}
              />
            </Route>
          </Route>
          <Route path="/admin" element={<AppLayout />}>
            <Route index={true} element={<EditProfile />} />
            <Route path='profile' element={<ProfileView />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
