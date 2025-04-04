import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import "react-toastify/dist/ReactToastify.css";
import ForgotPassword from "./components/ForgotPassword";
import Footer from "./components/Footer";
import MainHomePage from "./pages/MainHomePage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainHomePage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoutes>
              <Header />
              <HomePage />
            </ProtectedRoutes>
          }
        />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export function ProtectedRoutes(props) {
  if (localStorage.getItem("user")) {
    return props.children;
  } else {
    return <Navigate to="/" />;
  }
}
export default App;
