import React from "react";
import style from "./recipe.module.css";

const Recipe = ({ title, carbs, protein, fat, ingredients, image }) => {
  return (
    <div className={style.recipe}>
      <img className={style.image} src={image} alt="recipe" />
      <h1>{title}</h1>
      <div className="macros">
        <p>Carbs: {carbs} </p>
        <p>Protein: {protein} </p>
        <p>Fat: {fat} </p>
      </div>
      <ul>
        Ingredients:
        {ingredients.map(ingredient => (
          <li key={ingredient.text}>{ingredient.text}</li>
        ))}
      </ul>
    </div>
  );
};

export default Recipe;
