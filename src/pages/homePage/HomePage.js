import React from "react";
import FruitList from "./fruitItemList/FruitList";
import SeasonSelector from "./seasonSelector/SeasonSelector";
import "./homePagecs.css";
import { allFruitsArry } from "../../storeReducer/FruitSliceReducer";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../layout/navbar/Navbar";
import Button from "../../Components/button/Button";
import {
  setSeasoSelection,
  openModal,
  clearData,
} from "../../storeReducer/FruitSliceReducer";
import ModalForChekout from "../../Components/modals/modalCheckout/ModalForChekout";

const HomePage = () => {
  const allFruits = useSelector(allFruitsArry);
  const dispatch = useDispatch();
  const seasons = ["Winter", "Spring", "Summer", "Autumn"];
  const selectedSeason = useSelector((state) => state.fruits.selectedSeason);
  const { isOpen } = useSelector((state) => state.fruits);
  const totalValue = useSelector((state) => state.fruits.totalValue);
  const handleSeasonSelect = (season) => {
    dispatch(setSeasoSelection(season));
    console.log(totalValue);
  };
  const filteredFruits = selectedSeason
    ? allFruits.filter((fruit) => fruit.season === selectedSeason)
    : allFruits;
  const checkoutHandler = () => {
    dispatch(openModal());
  };
  const cancelBtnHandler = () => {
    dispatch(clearData());
  };
  return (
    <>
      <Navbar />
      <div className="index">
        <div className="Main-div">
          <h1 className="fruits-mart">Fruits Mart</h1>
          <div className="containerDiv">
            <div className="seasonSelector-div">
              <div className="season-container">
                <h4 className="season-heading">Season Selection</h4>
                <div>
                  <SeasonSelector
                    seasons={seasons}
                    onSelect={handleSeasonSelect}
                  />
                </div>
              </div>
            </div>
            <div className="list-of-fruits">
              <h2 className="season-heading">List of fruits</h2>
              <div className="prices-div">
                <FruitList
                  fruits={filteredFruits}
                  targetSeason={selectedSeason}
                />
              </div>
            </div>{" "}
          </div>
          <div className="labldiv">
            <label className="LablId">Total:</label>
            <input
              type="text"
              className="totalInput"
              readOnly
              value={totalValue?.toFixed(2)}
            />
          </div>
          <div className="Button-div">
            <Button onClick={checkoutHandler}>Checkout</Button>
            <Button onClick={cancelBtnHandler}>Cancel</Button>
          </div>{" "}
        </div>
        <div>{isOpen && <ModalForChekout />}</div>
      </div>
    </>
  );
};

export default HomePage;
