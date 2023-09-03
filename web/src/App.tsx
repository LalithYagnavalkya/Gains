import { BrowserRouter, Route, Routes } from "react-router-dom";

//pages
import { CardWithForm } from './Card'
import { Forgot, Login, Reset } from "./pages/auth";
const App: React.FC = () => {


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/reset" element={<Reset />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
