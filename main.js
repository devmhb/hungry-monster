const form = document.querySelector(".form");
const search = form.querySelector("#searchbar");
const mealsElement = document.querySelector(".meals");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let query = search.value;
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${query}`)
    .then((res) => res.json())
    .then((data) => displayMeals(data))
    .catch((err) => displayErrMsg(err));

  setTimeout(() => {
    search.value = "";
  }, 1000);

  let firstElement = mealsElement.firstElementChild;

  // Remove error msg and single meal element when user search
  if (firstElement) {
    if (firstElement.classList.contains("single-meal")) {
      firstElement.remove();
    } else if (firstElement.classList.contains("error")) {
      firstElement.remove();
    }
  }
});

const displayMeals = (data) => {
  let meals = data.meals;
  meals.forEach((meal) => {
    const mealElement = document.createElement("div");
    mealElement.setAttribute("class", "meal");

    const mealContent = `
      <img class="image" src="${meal.strMealThumb}">
      <h2 class="title">${meal.strMeal}</h2>
    `;

    mealElement.setAttribute("onclick", `loadMeal(${meal.idMeal})`);
    mealElement.innerHTML = mealContent;
    mealsElement.appendChild(mealElement);
  });
};

const displayErrMsg = (err) => {
  console.log(err);
  mealsElement.innerHTML = `
  <h2 class="error">This country's meals isn't available. Sorry about that.
  <br>
  Try searching for something else.</h2>`;
};

const loadMeal = (id) => {
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then((res) => res.json())
    .then((data) => displayMeal(data))
    .catch((err) => console.log(err));
};

const displayMeal = (data) => {
  let mealObj = data.meals;
  let singleMeal = mealObj[0];
  mealsElement.innerHTML = `
    <div class="single-meal">
    <img src="${singleMeal.strMealThumb}" alt="" />
    <h1 class="meal-title">${singleMeal.strMeal}</h1>
    <p class="ingredients">Ingredients</p>
      <ul class="lists">
        <li class="list">${singleMeal.strMeasure1} ${singleMeal.strIngredient1}</li>
        <li class="list">${singleMeal.strMeasure2} ${singleMeal.strIngredient2}</li>
        <li class="list">${singleMeal.strMeasure3} ${singleMeal.strIngredient3}</li>
        <li class="list">${singleMeal.strMeasure4} ${singleMeal.strIngredient4}</li>
        <li class="list">${singleMeal.strMeasure5} ${singleMeal.strIngredient5}</li>
      </ul>
    </div>
  `;
};
