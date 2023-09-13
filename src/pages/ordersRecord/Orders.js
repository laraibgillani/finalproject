import React, { useEffect, useState } from "react";
import "./orderscs.css";
import Navbar from "../../layout/navbar/Navbar";
import { toast } from "react-toastify";
import Button from "../../Components/button/Button";
import Login from "../loginPage/Login";
import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../storeReducer/FruitSliceReducer";

const Orders = () => {
  const isLogin = useSelector((state) => state.fruits.isLogin);
  const [orders, setOrders] = useState([]);
  const [isTokenValid, setIsTokenValid] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    if (!token || !tokenExpiration) {
      setIsTokenValid(false);
      return;
    }

    const currentTime = new Date().getTime();
    if (currentTime > parseInt(tokenExpiration, 10)) {
      setIsTokenValid(false);
      return;
    }

    fetch(
      "https://fruit-mart-dffeb-default-rtdb.firebaseio.com/OrdersCollection.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const ordersArray = [];
        for (let key in data) {
          data[key].id = key;
          ordersArray.push(data[key]);
        }
        setOrders(ordersArray);
      });
  }, []);

  const handleRemoveOrder = (id) => {
    const deleteRec = `https://fruit-mart-dffeb-default-rtdb.firebaseio.com/OrdersCollection/${id}.json`;
    fetch(deleteRec, {
      method: "DELETE",
    }).then((response) => {
      const updateRecords = orders.filter((order) => order.id !== id);
      setOrders(updateRecords);
      if (response.ok) {
        toast("Record Deleted", { position: "top-right" });
      } else {
        toast("Error in Record Deletetion", { position: "top-right" });
      }
    });
  };
  const signInHandler = () => {
    dispatch(setLogin());
    console.log("larry");
  };
  return (
    <div>
      <Navbar />
      {!isTokenValid ? (
        <div>
          {!isLogin && (
            <div className="flex">
              <h2 className="Token-class">
                Your session has expired. Please log in again.
              </h2>
              <Button onClick={signInHandler}>SignIn</Button>
            </div>
          )}

          {isLogin && <Login />}
        </div>
      ) : (
        <div>
          <h2 className="chekoutHeading">Checkout Record</h2>
          <div className="tablestyle">
            <div className="outer-wrapper">
              <div className="table-wrapper">
                <table className="orderTable">
                  <thead className="">
                    <tr>
                      <th className="table-Heading">Name </th>
                      <th className="table-Heading">Phone#</th>
                      <th className="table-Heading">Address</th>
                      <th className="table-Heading">Total-Price</th>
                      <th className="table-Heading">Payment-Method</th>
                      <th className="table-Heading">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id}>
                        <td className="tableData">{order.name}</td>
                        <td className="tableData">{order.num}</td>
                        <td className="tableData">{order.address}</td>
                        <td className="tableData">{order.totalValue} /RS</td>
                        <td className="tableData">{order.paymentMethod}</td>
                        <td>
                          {" "}
                          <div
                            className="tableData order-btn"
                            onClick={() => handleRemoveOrder(order.id)}
                          >
                            {" "}
                            X
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
