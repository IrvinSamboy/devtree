import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthPage from "../pages/auth/Auth.page"
import RootLayout from "../components/layout/RootLayout"

export default function Router() {
  return (
    <BrowserRouter >
        <Routes>
            <Route
              element={<RootLayout />}
            >
              <Route
                  path="/auth/"
                  element={<AuthPage />}
              />
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
