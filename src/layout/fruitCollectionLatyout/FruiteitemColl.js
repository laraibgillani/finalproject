import React from "react";
import FruitList from "../fruitListLayout/FruitList";
import SeasonSelector from "../seasonSelector/SeasonSelector";
import "./fruititemColl.css";

import { useDispatch, useSelector } from "react-redux";
import Navbar from "../navbar/Navbar";

import {
  setSeasoSelection,
  openModal,
} from "../../storeReducer/FruitSliceReducer";
import ModalForChekout from "../../Components/modals/modalCheckout/ModalForChekout";

const FruiteitemColl = () => {
  const allFruits = [
    { id: 1, fname: "apple", fprice: 100, season: "Winter", quantity: 1 },
    { id: 2, fname: "orange", fprice: 150, season: "Winter", quantity: 1 },
    { id: 3, fname: "banana", fprice: 200, season: "Winter", quantity: 1 },
    { id: 4, fname: "strawbery", fprice: 250, season: "Winter", quantity: 1 },
    { id: 5, fname: "pears", fprice: 170, season: "Winter", quantity: 1 },

    { id: 6, fname: "pineapple", fprice: 400, season: "Spring", quantity: 1 },
    { id: 7, fname: "Avocado", fprice: 190, season: "Spring", quantity: 1 },
    { id: 8, fname: "carrots", fprice: 170, season: "Spring", quantity: 1 },
    { id: 9, fname: "Bluberries", fprice: 350, season: "Spring", quantity: 1 },
    {
      id: 10,
      fname: "honeydew melons",
      fprice: 200,
      season: "Spring",
      quantity: 1,
    },

    { id: 11, fname: "Cherry", fprice: 200, season: "Summer", quantity: 1 },
    { id: 12, fname: "Mango", fprice: 100, season: "Summer", quantity: 1 },
    { id: 13, fname: "Watermelo", fprice: 100, season: "Summer", quantity: 1 },
    { id: 14, fname: "apricot", fprice: 300, season: "Summer", quantity: 1 },
    { id: 15, fname: "plum", fprice: 250, season: "Summer", quantity: 1 },

    { id: 16, fname: "Grapes", fprice: 200, season: "Autumn", quantity: 1 },
    {
      id: 17,
      fname: "Pomegrantes",
      fprice: 400,
      season: "Autumn",
      quantity: 1,
    },
    { id: 18, fname: "Blackberry", fprice: 350, season: "Autumn", quantity: 1 },
    { id: 19, fname: "figs", fprice: 200, season: "Autumn", quantity: 1 },
    { id: 20, fname: "kiwi", fprice: 250, season: "Autumn", quantity: 1 },
  ];
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
                  // handleTotalValueChange={handleTotalValueChange}
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
            <button className="chk-button btn" onClick={checkoutHandler}>
              Checkout
            </button>
            <button id="Cancel" className="chk-button btn">
              Cancel
            </button>
          </div>{" "}
        </div>
        <div>{isOpen && <ModalForChekout />}</div>
      </div>
    </>
  );
};

export default FruiteitemColl;
