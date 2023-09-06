import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import {
  decrementQuantity,
  incrementQuantity,
  checkBoxUpdate,
} from "../../../../storeReducer/FruitSliceReducer";
const FruitItem = ({ fruit }) => {
  const quantity = useSelector((state) => {
    const foundFruit = state.fruits.fruits.find((item) => item.id === fruit.id);
    return foundFruit ? foundFruit.quantity : 0;
  });
  const [isChecked, setIsChecked] = useState(false);
  const dispatch = useDispatch();
  const chekBoxHandler = () => {
    dispatch(checkBoxUpdate({ fruitId: fruit.id }));
  };
  const removbtnHandler = () => {
    dispatch(decrementQuantity({ fruitId: fruit.id }));
  };

  const addbtnHandler = () => {
    console.log("heloo");
    dispatch(incrementQuantity({ fruitId: fruit.id }));
  };

  return (
    <div className="class-divSeasson" key={fruit.id}>
      <input
        type="checkbox"
        className="chkBox"
        onChange={() => {
          setIsChecked(!isChecked);
          chekBoxHandler();
        }}
      />
      <h4 className="class-fruitName">{fruit.fname}</h4>
      <h4 className="class-fruitprice">${fruit.fprice}</h4>
      <div className="class-CounterButtonDiv">
        <button className="class-counterButton" onClick={removbtnHandler}>
          -
        </button>
        <h4 className="h4-heading">{quantity} </h4>
        <button className="class-counterButton" onClick={addbtnHandler}>
          +
        </button>
      </div>
    </div>
  );
};

export default FruitItem;
