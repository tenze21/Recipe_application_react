import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

const AppContext = React.createContext();

const allMealsUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
const randomMealUrl = "https://www.themealdb.com/api/json/v1/1/random.php";

const getFavouritesFromLocalStorage =()=>{
  let favourites = localStorage.getItem("favourites");
  if(favourites){
    favourites = JSON.parse(localStorage.getItem("favourites"));
  }else{
    favourites = [];
  }
  return favourites;
}

const AppProvider = ({ children }) => {
  // Usestate hooks for meals
  const [loading, setLoading] = useState(false);
  const [meals, setMeals] = useState([]);

  // useState hook for search.
  const [searchTerm, setSearchTerm] = useState("");

  // useState hook for modal.
  const [showModal, setModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  // Usestate hook for favourites.
  const [favourites, setFavourites]= useState(getFavouritesFromLocalStorage());

  const fetchMeals = async (url) => {
    setLoading(true);
    try {
      const { data } = await axios(url);
      if (data.meals) {
        setMeals(data.meals);
      } else {
        setMeals([]);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const fetchRandomMeal = () => {
    fetchMeals(randomMealUrl);
  };

  const selectMeal = (idMeal, favouriteMeal) => {
    let meal;
    if(favouriteMeal){
      meal = favourites.find((meal) => meal.idMeal === idMeal);
    }else{
      meal = meals.find((meal) => meal.idMeal === idMeal);
    }
    
    setSelectedMeal(meal);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const addFavourites= (idMeal)=>{
    const alreadyFavourite= favourites.find((meal)=>meal.idMeal===idMeal);
    if(alreadyFavourite){
      return
    }
    const meal = meals.find((meal)=>meal.idMeal===idMeal);
    const updatedFavourites= [...favourites,meal];
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  }
  const removeFromFavourites= (idMeal)=>{
    const updatedFavourites= favourites.filter((meal)=>meal.idMeal!==idMeal);
    setFavourites(updatedFavourites);
    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));
  }

  useEffect(() => {
    fetchMeals(allMealsUrl);
  }, []);

  useEffect(() => {
    if (!searchTerm) return;

    fetchMeals(`${allMealsUrl}${searchTerm}`);
  }, [searchTerm]);

  return (
    <AppContext.Provider
      value={{
        loading,
        meals,
        setSearchTerm,
        fetchRandomMeal,
        showModal,
        selectedMeal,
        selectMeal,
        closeModal,
        favourites,
        addFavourites,
        removeFromFavourites,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
