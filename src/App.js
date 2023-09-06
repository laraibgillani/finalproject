import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FruiteitemColl from "./layout/fruitCollectionLatyout/FruiteitemColl";
import { ToastContainer } from "react-toastify";
import Orders from "./layout/ordersRecord/Orders";
function App() {
  return (
    <>
      <Router>
        <ToastContainer />
        <Routes>
          <Route exact path="/" element={<Login />}></Route>;
          <Route exact path="/orders" element={<Orders />}></Route>;
          <Route exact path="/home" element={<FruiteitemColl />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
