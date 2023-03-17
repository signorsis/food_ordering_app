import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";
import useFetch from "../../hooks/use-fetch";
import { useCallback, useEffect, useMemo, useState } from "react";

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
  const [mealData, setMealData] = useState([]);
  
  
  
  const extractData = useCallback((meals) => {
    setMealData(meals);
  }, []);
  
  const requestconfig = useMemo (()=> {return {
    url: "https://react-http-c8937-default-rtdb.firebaseio.com/meals.json"
  }},[])
  
  const { error, isLoading, fetchRequest: fetchMeals } = useFetch(requestconfig,extractData);

  useEffect(()=>{fetchMeals()}
  ,[fetchMeals])

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
