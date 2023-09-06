// CheckoutModal.js
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectSelectedFruits } from "../../../storeReducer/FruitSliceReducer";
import { clearData } from "../../../storeReducer/FruitSliceReducer";
import "./modalcs.css";
import {
  closeModal,
  okModalOpen,
} from "../../../storeReducer/FruitSliceReducer";
import ConfirmationModal from "../modalConfirmation/ConfirmationModal";

const ModalForChekout = () => {
  const dispatch = useDispatch();
  const { okIsOpen } = useSelector((state) => state.fruits);

  const selectedFruits = useSelector(selectSelectedFruits);
  const allFruits = useSelector((state) => state.fruits.fruits);
  const selectedFruitsDetails = allFruits.filter((fruit) =>
    selectedFruits.includes(fruit.id)
  );
  const totalValue = useSelector((state) => state.fruits.totalValue);
  const cancelModal = () => {
    dispatch(closeModal());
    dispatch(clearData());
  };
  const okHandler = () => {
    dispatch(okModalOpen());
  };
  const crossHandler = () => {
    dispatch(closeModal());
    dispatch(clearData());
  };
  return (
    <>
      <div className="modal-overlay">
        <div className="classitems">
          <header className="headerClass">
            <h2 className="h2OfModal">Selected Fruits</h2>
            <span className="modalcloseChekout" onClick={crossHandler}>
              {"  "} &times;
            </span>
          </header>

          <div className="order-classItems">
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
          </div>

          <h5 className="p-fruitsTotal">
            Total Value: {totalValue.toFixed(2)}
          </h5>
          <footer className="footerClass">
            <button className="buttons" onClick={okHandler}>
              Ok
            </button>
            <button className="buttons" onClick={cancelModal}>
              cancel
            </button>
          </footer>
        </div>
      </div>
      {okIsOpen && <ConfirmationModal />}
    </>
  );
};

export default ModalForChekout;
