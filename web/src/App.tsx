import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//pages
import { CardWithForm } from './Card'
import { Forgot, Login, Reset } from "./pages/auth";
import { PrivateRoutes } from "./utils/privateRoutes";
import { Home } from "./pages/home/Home";
const App: React.FC = () => {


  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/" element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
          </Route>
          <Route path="*" element={<Navigate to='/home' />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
