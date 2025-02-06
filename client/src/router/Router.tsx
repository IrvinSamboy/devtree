import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "../pages/auth/Signin/Signin.page"
import RootLayout from "../components/layout/RootLayout"
import Signup from "../pages/auth/Signup/Signup.page"
import AppLayout from "../components/layout/AppLayout"

export default function Router() {
  return (
    <BrowserRouter >
        <Routes>
            <Route
              element={<RootLayout />}
            >
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

              <Route path="/admin" element={<AppLayout />}>

              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
