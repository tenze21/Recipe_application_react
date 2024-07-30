import { useGlobalContext } from "../context";
import { FiThumbsUp } from "react-icons/fi";

const Meals = () => {
  const { meals, loading, selectMeal, addFavourites } = useGlobalContext();

  if (loading) {
    return (
      <section className="section">
        <h4>Loading...</h4>
      </section>
    );
  }

  if (meals.length < 1) {
    return (
      <section className="section">
        <h4>No meals match your search term. Please try again.</h4>
      </section>
    );
  }

  return (
    <section className="section-center">
      {meals.map((singleMeal) => {
        const { idMeal, strMeal: title, strMealThumb: image } = singleMeal;
        return (
          <article key={idMeal} className="single-meal">
            <img
              src={image}
              className="img"
              alt={title}
              onClick={() => selectMeal(idMeal)}
            />{" "}
            {/* if we don't use the arrow function the function is invoked right away. To avoid that we set up the function as a return for the arrow function */}
            <footer>
              <h5>{title}</h5>
              <button className="like-btn" onClick={()=>addFavourites(idMeal)}>
                <FiThumbsUp />
              </button>
            </footer>
          </article>
        );
      })}
    </section>
  );
};
export default Meals;
