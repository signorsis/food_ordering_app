import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useFetch from "../../hooks/use-fetch";
import { useCallback, useEffect, useState } from "react";

// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

const AvailableMeals = () => {
  const [isLoading,setIsLoading]=useState(false)
 
  const [error,setError]=useState(false)
  const [mealData, setMealData] = useState([]);
  const fetchRequest = useCallback(async () => {
     setIsLoading(true);
     setError(null);
    try {
      const response = await fetch("https://react-http-c8937-default-rtdb.firebaseio.com/meals.json"
      );

      if (!response.ok) {
        throw new Error("error fetching ");
      }
      const data = await response.json();
    
      setMealData(data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  }, []);

  useEffect(()=>{fetchRequest()},[fetchRequest])

   let mealsList;
  if (mealData.length > 0) {
    mealsList = mealData.map((meal) => (
      <MealItem
        key={meal.id}
        id={meal.id}
        name={meal.name}
        description={meal.description}
        price={meal.price}
      />
    ));
  }
  if (error) {
    mealsList = <p>Error fetching meals from database </p>;
  }
  if (isLoading) {
    mealsList = <p>loading meals...</p>;
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
