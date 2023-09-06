import React, { useState } from "react";
import "./confirmationModalcs.css";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedFruits } from "../../../storeReducer/FruitSliceReducer";
import { closeModal } from "../../../storeReducer/FruitSliceReducer";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearData } from "../../../storeReducer/FruitSliceReducer";
import Button from "../../button/Button";

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
  const [formAddressData, setAddressData] = useState({
    name: "",
    num: "",
    address: "",
    totalValue: "",
  });
  const [tabState, setTabState] = useState(1);
  const action = (index) => {
    setTabState(index);
  };
  const [num, setNum] = useState("");
  const handleNumChange = (event) => {
    const limit = 11;
    setNum(event.target.value.slice(0, limit));
    const { name, value } = event.target;
    setAddressData({
      ...formAddressData,
      [name]: value,
    });
  };
  const crossHandler = () => {
    dispatch(closeModal());
    dispatch(clearData());
  };
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddressData({
      ...formAddressData,
      [name]: value,
    });
  };
  const handleAddressSubmit = (e) => {
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

    const { name, num, address } = formAddressData;

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

  const submitDataToDatabase = async (e) => {
    e.preventDefault();
    const { name, num, address } = formAddressData;
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
                <div className={`${tabState === 1 ? "tab active-tab" : "tab"}`}>
                  Details
                </div>
                <div className={`${tabState === 2 ? "tab active-tab" : "tab"}`}>
                  Address{" "}
                </div>
                <div className={`${tabState === 3 ? "tab active-tab" : "tab"}`}>
                  Payment
                </div>
                <div className={`${tabState === 4 ? "tab active-tab" : "tab"}`}>
                  Confirmation
                </div>
              </div>
            </div>{" "}
            <span className="modalcloseChekout " onClick={crossHandler}>
              {"  "} &times;
            </span>
          </header>

          <div className="contents">
            <div
              className={`${tabState === 1 ? "active-contentt " : " content"}`}
            >
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
                <Button onClick={() => action(2)}> Next</Button>
              </div>
            </div>
            <div
              className={`${
                tabState === 2 ? "content active-content" : "content"
              }`}
            >
              <div className="formStyle">
                <form onSubmit={handleAddressSubmit}>
                  <label className="labelClass" htmlFor="name">
                    <b>Name:</b>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formAddressData.name}
                    className="nameInput"
                    onChange={handleAddressChange}
                    required
                  />
                  <br />
                  <label className="labelClass" htmlFor="name">
                    <b>ph#: </b>
                  </label>
                  <input
                    type="number"
                    name="num"
                    value={formAddressData.num}
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
                    value={formAddressData.address}
                    className="adresInput"
                    onChange={handleAddressChange}
                    required
                  ></textarea>
                  <Button type="submit" onClick={addressHandler}>
                    Next
                  </Button>
                </form>
              </div>
            </div>
            <div
              className={`${
                tabState === 3 ? "content active-content" : "content"
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
                    <Button type="submit" onClick={paymentHandler}>
                      Submit
                    </Button>
                  )}
                </form>
              </div>
            </div>
            <div
              className={`${
                tabState === 4 ? "content active-content" : "content"
              }`}
            >
              <div className="confirmAll">
                <h2 className="h2OfModal">Confirmation of Your chekout</h2>
                <hr />
                <h5 className="p-fruitsTotal h5ModalClass">
                  Total Value: {totalValue.toFixed(2)}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Name:{formAddressData.name}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Phone No:{formAddressData.num}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  Address:{formAddressData.address}
                </h5>
                <h5 className="p-fruitsTotal h5ModalClass">
                  payment way:{paymentMethod}
                </h5>
                <hr />
                <div className="butoon-flex">
                  <Button onClick={submitDataToDatabase}>Confirm Order</Button>
                  <Button onClick={crossHandler}>Cancel</Button>
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
