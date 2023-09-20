import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//pages
import { Forgot, Login, Reset } from "./pages/auth";
import { PrivateRoutes } from "./utils/privateRoutes";
import { Home } from "./pages/home/Home";
const App: React.FC = () => {
  let user = null;

  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/auth" element={<PrivateRoutes />}>
            <Route path="home" element={<Home />} />
          </Route>
          <Route path="/" element={<Navigate to={user === null?  "login" : "/auth/home"} />} />
          <Route path="*" element={<Navigate to={user === null ? "login" : "/auth/home"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
