import React, { useEffect, useState } from "react";
import "./orderscs.css";
import Navbar from "../navbar/Navbar";
import { toast } from "react-toastify";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
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
      toast("Record Deleted", { position: "top-right" });
    });
  };

  return (
    <div>
      <Navbar />
      <h2 className="chekoutHeading">Chekout Record</h2>
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
                      <button
                        className="tableData order-btn"
                        onClick={() => handleRemoveOrder(order.id)}
                      >
                        X
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>{" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
