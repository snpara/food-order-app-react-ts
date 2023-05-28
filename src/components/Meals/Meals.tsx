import { Fragment } from "react";
import MealsSummary from "./MealsSummary";
import AvaliableMeals from "./AvailableMeals";

const Meals: React.FC = () => {
  return (
    <Fragment>
      <MealsSummary />
      <AvaliableMeals />
    </Fragment>
  );
};

export default Meals;
