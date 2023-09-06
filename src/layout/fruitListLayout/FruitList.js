import React from "react";
import "./fruitList.css";
import { useSelector } from "react-redux/es/hooks/useSelector";
import FruitItem from "../fruitItemLayout/FruitItem";
const FruitList = ({ targetSeason, handleTotalValueChange }) => {
  const fruits = useSelector((state) => state.fruits.fruits);
  const filteredFruits = fruits?.filter(
    (fruit) => fruit.season === targetSeason
  );

  return (
    <div>
      {filteredFruits?.map((fruit) => (
        <FruitItem
          key={fruit.id}
          fruit={fruit}
          handleTotalValueChange={handleTotalValueChange}
        />
      ))}
    </div>
  );
};

export default FruitList;
