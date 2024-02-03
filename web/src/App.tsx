// modules
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

//pages
import { Forgot, Login, Reset } from "./pages/auth";
import { Home } from "./pages/dashboard/dashboard.page";
import { Customer } from "./pages/customers/customers.page";
import Landing from "./pages/landingPage/landing.page";
import SingleCustomerPage from "./pages/customers/singleCustomerPage/singleCustomerPage";

// others
import { PrivateRoutes } from "./utils/privateRoutes";
import { useSelector } from "react-redux";

const App: React.FC = () => {
  const { isAuthenticated } = useSelector((state: any) => state.user);

  return (
    <div className="min-h-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgotPassword" element={<Forgot />} />
          <Route path="/resetpassword" element={<Reset />} />
          <Route path="/app" element={<PrivateRoutes />}>
            <Route path="home" element={<Home />} />
            <Route path="customers" element={<Customer />} />
            <Route path="customers/:customerId" element={<SingleCustomerPage />} />
          </Route>
          <Route path="/" element={<Landing />} />
          <Route path="*" element={<Navigate to={isAuthenticated ? "login" : "/app/home"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
