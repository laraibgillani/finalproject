import React, { useState } from "react";
import "./confirmationModalcs.css";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedFruits } from "../../../storeReducer/FruitSliceReducer";
import { closeModal } from "../../../storeReducer/FruitSliceReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearData } from "../../../storeReducer/FruitSliceReducer";

const ConfirmationModal = () => {
  const dispatch = useDispatch();
  const totalValue = useSelector((state) => state.fruits.totalValue);
  const selectedFruits = useSelector(selectSelectedFruits);
  const allFruits = useSelector((state) => state.fruits.fruits);
  const selectedFruitsDetails = allFruits.filter((fruit) =>
    selectedFruits.includes(fruit.id)
  );
  const [isChcked, setisChcked] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    num: "",
    address: "",
    totalValue: "",
  });
  const [state, setState] = useState(1);
  const action = (index) => {
    setState(index);
  };
  const [num, setNum] = useState("");
  const handleNumChange = (event) => {
    const limit = 11;
    setNum(event.target.value.slice(0, limit));
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const crossHandler = () => {
    dispatch(closeModal());
    // dispatch(clearData());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const paymentSubmit = (e) => {
    e.preventDefault();
  };
  const chekboxHandleChange = (e) => {
    setPaymentMethod(e.target.value);
    setisChcked(true);
  };
  const addressHandler = (e) => {
    e.preventDefault();

    const { name, num, address } = formData;

    if (name && num && address) {
      action(3);
    } else {
      toast("Fill the missing information", { position: "top-right" });
    }
  };
  const paymentHandler = (e) => {
    e.preventDefault();
    action(4);
  };

  const submitData = async (e) => {
    e.preventDefault();
    const { name, num, address } = formData;
    if (name && num && address && paymentMethod && totalValue) {
      const res = fetch(
        "https://fruit-mart-dffeb-default-rtdb.firebaseio.com/OrdersCollection.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalValue,
            name,
            num,
            address,
            paymentMethod,
          }),
        }
      );
      if (res) {
        dispatch(closeModal());
        dispatch(clearData());

        toast("Data submitted Successfully", { position: "top-right" });
      } else {
        toast("Fill the missing information", { position: "top-right" });
      }
    } else {
      toast("Fill the missing information", { position: "top-right" });
    }
  };
  return (
    <>
      <div className="modal-overlay">
        <div className="mainContainerClass">
          <header className="headerModal">
            <div className="box">
              <div className="tabs">
                <div className={`${state === 1 ? "tab active-tab" : "tab"}`}>
                  Details
                </div>
                <div className={`${state === 2 ? "tab active-tab" : "tab"}`}>
                  Address{" "}
                </div>
                <div className={`${state === 3 ? "tab active-tab" : "tab"}`}>
                  Payment
                </div>
                <div className={`${state === 4 ? "tab active-tab" : "tab"}`}>
                  Confirmation
                </div>
              </div>
            </div>{" "}
            <span className="modalcloseChekout " onClick={crossHandler}>
              {"  "} &times;
            </span>
          </header>

          <div className="contents">
            <div className={`${state === 1 ? "active-contentt " : " content"}`}>
              <div className="order-classItemsClass">
                <table className="table-primary">
                  <thead>
                    <tr>
                      <th className="th-Modal">Fruit </th>
                      <th className="th-Modal">Price</th>
                      <th className="th-Modal">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedFruitsDetails.map((fruit) => (
                      <tr key={fruit.id}>
                        <td className="td-modal">{fruit.fname}</td>
                        <td className="td-modal">${fruit.fprice}</td>
                        <td className="td-modal">{fruit.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Total Value: {totalValue.toFixed(2)}
                </h5>
                <button className="buttons" onClick={() => action(2)}>
                  Next
                </button>
              </div>
            </div>
            <div
              className={`${
                state === 2 ? "content active-content" : "content"
              }`}
            >
              <div className="formStyle">
                <form onSubmit={handleSubmit}>
                  <label className="labelClass" htmlFor="name">
                    <b>Name:</b>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    className="nameInput"
                    onChange={handleChange}
                    required
                  />
                  <br />
                  <label className="labelClass" htmlFor="name">
                    <b>ph#: </b>
                  </label>
                  <input
                    type="number"
                    name="num"
                    value={formData.num}
                    onChange={handleNumChange}
                    className="nameInput"
                    required
                  />
                  <br />
                  <label
                    className="labelClass"
                    name="ADDRESS"
                    htmlFor="address"
                  >
                    <b>Address:</b>
                  </label>
                  <br />
                  <textarea
                    name="address"
                    value={formData.address}
                    className="adresInput"
                    onChange={handleChange}
                    required
                  ></textarea>
                  <button
                    className="buttons"
                    type="submit"
                    onClick={addressHandler}
                  >
                    submit Addres
                  </button>
                </form>
              </div>
            </div>
            <div
              className={`${
                state === 3 ? "content active-content" : "content"
              }`}
            >
              <div className="confirmAll">
                <form onSubmit={paymentSubmit}>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={chekboxHandleChange}
                  />{" "}
                  <label htmlFor="card">
                    {" "}
                    I have a <b>Card</b>{" "}
                  </label>
                  <br />
                  <input
                    type="radio"
                    name="payment"
                    value="credit"
                    checked={paymentMethod === "credit"}
                    onChange={chekboxHandleChange}
                  />{" "}
                  <label htmlFor="credit">
                    {" "}
                    I have <b>Credit card</b>{" "}
                  </label>
                  <br />
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={chekboxHandleChange}
                  />{" "}
                  <label htmlFor="paypal">
                    {" "}
                    I have <b>PayPal</b>{" "}
                  </label>
                  <br />
                  <input
                    type="radio"
                    name="payment"
                    value="jazcash"
                    checked={paymentMethod === "jazcash"}
                    onChange={chekboxHandleChange}
                  />{" "}
                  <label htmlFor="jazcash">
                    {" "}
                    I have <b>JazzCash</b>{" "}
                  </label>
                  <br />
                  {isChcked && (
                    <button
                      className="buttons"
                      type="submit"
                      onClick={paymentHandler}
                    >
                      Submit
                    </button>
                  )}
                </form>
              </div>
            </div>
            <div
              className={`${
                state === 4 ? "content active-content" : "content"
              }`}
            >
              <div className="confirmAll">
                <h2 className="h2OfModal">Confirmation of Your chekout</h2>
                <hr />
                <h5 className="p-fruitsTotal h5ModalClass">
                  Total Value: {totalValue.toFixed(2)}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Name:{formData.name}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Phone No:{formData.num}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Address:{formData.address}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  payment way:{paymentMethod}
                </h5>
                <hr />
                <div className="butoon-flex">
                  <button className="buttons" onClick={submitData}>
                    Confirm Order
                  </button>
                  <button className="buttons" onClick={crossHandler}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationModal;
