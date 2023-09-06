import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/loginPage/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/homePage/HomePage";
import { ToastContainer } from "react-toastify";
import Orders from "./pages/ordersRecord/Orders";
function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>;
          <Route exact path="/orders" element={<Orders />}></Route>;
          <Route exact path="/home" element={<HomePage />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
