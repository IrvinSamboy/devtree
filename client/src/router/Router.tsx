import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signin from "../pages/auth/Signin/Signin.page"
import RootLayout from "../components/layout/RootLayout"
import Signup from "../pages/auth/Signup/Signup.page"

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
                  path="/auth/signin"
                  element={<Signin />}
                />
                <Route 
                  path="/auth/signUp"
                  element={<Signup />}
                />
              </Route>
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
