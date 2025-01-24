import { BrowserRouter, Routes, Route } from "react-router-dom"
import AuthPage from "../pages/auth/Auth.page"

export default function Router() {
  return (
    <BrowserRouter >
        <Routes>
            <Route
                path="/auth/"
                element={<AuthPage />}
            />
        </Routes>
    </BrowserRouter>
  )
}
