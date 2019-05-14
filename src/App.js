import React, { useEffect, useState } from "react";
import "./App.css";
import Recipe from "./Recipe";

require("dotenv").config();

const App = () => {
  const APP_ID = "fad64e4c";
  const APP_KEY = "e35a87585e5db190b72f46cd8bbc6771";
  // don't bother stealing this key -- it is disabled. you can make your own free key & id to use at https://www.edamam.com

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState(``);
  const [query, setQuery] = useState();

  useEffect(() => {
    getRecipes();
  }, [query]);
  // the ', []' empty makes it so useEffect only runs on initial mounting, otherwise you enter the hookName to run on function

  const getRecipes = async () => {
    const res = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=3&calories=591-722&health=alcohol-free`
    );
    const data = await res.json();
    setRecipes(data.hits);
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const handleQuery = e => {
    e.preventDefault();
    setQuery(search);
    setSearch(``);
  };

  return (
    <div className="App">
      <form onSubmit={handleQuery} className="search-form">
        <input
          className="search-field"
          type="text"
          value={search}
          onChange={handleSearch}
        />
        <button className="search-button" type="submit">
          Search
        </button>
      </form>
      <div className="recipes">
        {recipes.map((recipe, i) => (
          <Recipe
            key={i}
            title={recipe.recipe.label}
            carbs={Math.round(recipe.recipe.totalNutrients.CHOCDF.quantity)}
            protein={Math.round(recipe.recipe.totalNutrients.PROCNT.quantity)}
            fat={Math.round(recipe.recipe.totalNutrients.FAT.quantity)}
            ingredients={recipe.recipe.ingredients}
            image={recipe.recipe.image}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
