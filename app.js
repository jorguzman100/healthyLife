$(document).ready(() => {
  // #recipeSearchInput
  // #searchButton
  // #numberSelect
  // #cuisinesSelect
  // #dietSelect
  // #readyTimeSelect
  // #sortSelect
  // #intolerancesDropdown
  // #includeIngredientsInput
  // #includeIngredientsButton
  // #excludeIngredientsInput
  // #excludeIngredientsButton

  /* ********************* Global Variables ********************* */
  const cusinesArray = [
    "African",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  var dietsArray = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
    "Primal",
    "Whole30",
  ];

  var intolerancesArray = [
    "Dairy",
    "Egg",
    "Gluten",
    "Grain",
    "Peanut",
    "Seafood",
    "Sesame",
    "Shellfish",
    "Soy",
    "Sulfite",
    "Tree Nut",
    "Wheat",
  ];

  var mealTypesArray = [
    "main course",
    "side dish",
    "dessert",
    "appetizer",
    "salad",
    "bread",
    "breakfast",
    "soup",
    "beverage",
    "sauce",
    "marinade",
    "fingerfood",
    "snack",
    "drink",
  ];

  var sortOptionsArray = [
    "meta-score",
    "popularity",
    "healthiness",
    "price",
    "time",
    "random",
    "max-used-ingredients",
    "min-missing-ingredients",
    "alcohol",
    "caffeine",
    "copper",
    "energy",
    "calories",
    "calcium",
    "carbohydrates",
    "carbs",
    "choline",
    "cholesterol",
    "total-fat",
    "fluoride",
    "trans-fat",
    "saturated-fat",
    "mono-unsaturated-fat",
    "poly-unsaturated-fat",
    "fiber",
    "folate",
    "folic-acid",
    "iodine",
    "iron",
    "magnesium",
    "manganese",
    "vitamin-b3",
    "niacin",
    "vitamin-b5",
    "pantothenic-acid",
    "phosphorus",
    "potassium",
    "protein",
    "vitamin-b2",
    "riboflavin",
    "selenium",
    "sodium",
    "vitamin-b1",
    "thiamin",
    "vitamin-a",
    "vitamin-b6",
    "vitamin-b12",
    "vitamin-c",
    "vitamin-d",
    "vitamin-e",
    "vitamin-k",
    "sugar",
    "zinc",
  ];

  /* ********************* Functions ********************* */
  /* ------------------ Start ------------------ */
  displayVoila();

  /* ------------------ Global ------------------ */

  function getFromLocalStorage() {
    console.log("getFromLocalStorage()");
    const lsArray = [];
    for (i = 0; i < localStorage.length; i++) {
      let lsKey = localStorage.key(i);
      let lsItem = localStorage.getItem(lsKey);
      lsItem = JSON.parse(lsItem);
      lsArray.push(lsItem);
    }
    return lsArray;
  }

  function runAjaxGet(url, thenFunction, lsName, id) {
    console.log("runAjaxGet()");
    $.ajax({
      url: url,
      method: "GET",
    }).then((response) => {
      thenFunction(response, lsName, id);
    });
  }

  /* function runAjaxPost(url, thenFunction, lsName) {
    console.log("runAjaxPost()");
    $.ajax({
      url: url,
      method: "POST",
    }).then((response) => {
      thenFunction(response, lsName);
    });
  } */

  /* ------------------ Search ------------------ */
  // Load cuisines options
  cusinesArray.forEach((cuisine) => {
    let option = $("<option>");
    option.text(cuisine);
    $("#cuisinesSelect").append(option);
  });

  // Load diets options
  dietsArray.forEach((diet) => {
    let option = $("<option>");
    option.text(diet);
    $("#dietSelect").append(option);
  });

  // Load sort options
  sortOptionsArray.forEach((sort) => {
    let option = $("<option>");
    option.text(sort);
    $("#sortSelect").append(option);
  });

  // Load intolerances options
  intolerancesArray.forEach((intolerance, i) => {
    let formCheckDiv = $("<div>");
    let dropCheckInput = $("<input>");
    let dropCheckLabel = $("<label>");
    formCheckDiv.attr("class", "form-check");
    dropCheckInput.attr("type", "checkbox");
    dropCheckInput.attr("class", "form-check-input");
    dropCheckInput.attr("id", "intolerancesDropdownCheck" + i);
    dropCheckLabel.attr("class", "form-check-label");
    dropCheckLabel.attr("for", "intolerancesDropdownCheck" + i);
    dropCheckLabel.text(intolerance);
    formCheckDiv.append(dropCheckInput);
    formCheckDiv.append(dropCheckLabel);
    $("#intolerancesDropdown").append(formCheckDiv);
  });

  function saveToLocalStorage(resp, lsName, property, id) {
    console.log("saveToLocalStorage()");
    console.log("RESPONSE", resp);
    console.log("lsName: ", lsName);
    console.log("id: ", id);
    if (property) {
      console.log("property: ", property);
      const lsArray = getFromLocalStorage();
      lsArray.forEach((item) => {
        console.log("item.search: ", item.search);
        if (item.search === lsName) {
          console.log("SECOND SAVE");
          switch (property) {
            case "visNutrition":
              console.log("case: visNutrition");
              item.nutrition.push({
                id: id,
                visNutrition: resp,
              });
              displayNutrition(id, lsName, resp);
              break;
            case "visPrice":
              console.log("case: visPrice");
              item.price.push({
                id: id,
                visPrice: resp,
              });
              break;
            case "visIngredients":
              console.log("case: visIngredients");
              item.ingreds.push({
                id: id,
                visIngredients: resp,
              });
              displayIngredients(id, lsName, resp);
              break;
            case "visEquipement":
              console.log("case: visEquipement");
              item.equipment.push({
                id: id,
                visEquipement: resp,
              });
              break;
          }

          console.log("item: ", item);
          let itemStr = JSON.stringify(item);
          localStorage.setItem(lsName, itemStr);
        }
      });
    } else {
      console.log("FIRST SAVE");
      let responseObject = {
        search: lsName,
        response: resp,
        nutrition: [],
        price: [],
        ingreds: [],
        equipment: [],
      };
      let responseObjectString = JSON.stringify(responseObject);
      localStorage.setItem(lsName, responseObjectString);
      const randomRespNum = Math.floor(Math.random() * resp.results.length);
      resp = resp.results[randomRespNum];
      displayVoila(resp.title, resp.id, resp.image, resp.summary);
    }
  }

  /* ------------------ Voila ------------------ */
  function displayVoila(title, id, imageUrl, summary) {
    console.log("displayVoila()");
    console.log("title: " + title + "   id: " + id);

    if (id) {
      $("#recipeNameH5").text(title);
      $("#recipientIdP").text("ID: " + id);
      $("#recipeImage").attr("src", imageUrl);
      $("#summaryDiv").html(summary);
      getVisualizeNutrition(id, title);
    } else {
      const lsArray = getFromLocalStorage();
      if (lsArray.length > 0) {
        console.log("lsArray: ", lsArray);
        const randomlsArrayNum = Math.floor(Math.random() * lsArray.length);
        const randomResultsArrayNum = Math.floor(
          Math.random() * lsArray[randomlsArrayNum].response.results.length
        );
        console.log(
          "randomlsArrayNum: " +
            randomlsArrayNum +
            " randomResultsArrayNum: " +
            randomResultsArrayNum
        );

        $("#recipeNameH5").text(
          lsArray[randomlsArrayNum].response.results[randomResultsArrayNum]
            .title
        );
        $("#recipientIdP").text(
          "ID: " +
            lsArray[randomlsArrayNum].response.results[randomResultsArrayNum].id
        );
        $("#recipeImage").attr(
          "src",
          lsArray[randomlsArrayNum].response.results[randomResultsArrayNum]
            .image
        );
        $("#summaryDiv").html(
          lsArray[randomlsArrayNum].response.results[randomResultsArrayNum]
            .summary
        );
        getVisualizeNutrition(
          lsArray[randomlsArrayNum].response.results[randomResultsArrayNum].id,
          lsArray[randomlsArrayNum].search,
          lsArray
        );
      }
    }
  }

  /* ------------------ Nutritional Information ------------------ */
  function getVisualizeNutrition(id, lsName, lsArray) {
    console.log("getVisualizeNutrition()");
    let matchFlag = 0;
    if (lsArray) {
      lsArray.forEach((item) => {
        item.nutrition.forEach((ingredObject) => {
          console.log("ingredObject.id: " + ingredObject.id + "  id: ", id);
          if (ingredObject.id === id) {
            console.log("NUTRITION MATCH!");
            matchFlag = 1;
            displayNutrition(
              ingredObject.id,
              item.search,
              ingredObject.visNutrition
            );
          }
        });
      });
    }

    if (matchFlag === 0) {
      const visNutriUrl = `https://api.spoonacular.com/recipes/${id}/nutritionWidget?defaultCss=true`;
      runAjaxGet(visNutriUrl, bridgeNutrition, lsName, id);
    }
  }

  function bridgeNutrition(res, lsName, id) {
    console.log("bridgeNutrition()");
    console.log("lsName: ", lsName);
    console.log("id: ", id);
    saveToLocalStorage(res, lsName, "visNutrition", id);
  }

  function displayNutrition(id, lsName, visNutrition) {
    console.log("displayNutrition()");
    console.log("id: ", id);
    console.log("lsName: ", lsName);
    $("#visNutritionDiv").html(visNutrition);
    getVisualIngredients(id, lsName);
  }

  /* ------------------ Price Breakdown ------------------ */
  /* ------------------ Ingredients ------------------ */
  function getVisualIngredients(id, lsName) {
    console.log("getVisualIngredients()");
    console.log("id: ", id);
    console.log("lsName: ", lsName);
    let matchFlag = 0;
    const lsArray = getFromLocalStorage();
    lsArray.forEach((item) => {
      item.ingreds.forEach((ingredObject) => {
        console.log("ingredObject.id: " + ingredObject.id + "  id: ", id);
        if (ingredObject.id === id) {
          console.log("INGREDS MATCH!");
          matchFlag = 1;
          displayIngredients(id, lsName, ingredObject.visIngredients);
        }
      });
    });
    if (matchFlag === 0) {
      const visIngredsUrl = `https://api.spoonacular.com/recipes/${id}/ingredientWidget?defaultCss=true`;
      runAjaxGet(visIngredsUrl, bridgeIngredients, lsName, id);
    }
  }

  function bridgeIngredients(res, lsName, id) {
    console.log("bridgeIngredients()");
    console.log("lsName: ", lsName);
    console.log("id: ", id);
    console.log("res: ", res);
    saveToLocalStorage(res, lsName, "visIngredients", id);
  }

  function displayIngredients(id, lsName, visIngredients) {
    console.log("displayIngredients()");
    console.log("id: ", id);
    console.log("lsName: ", lsName);
    $("#visIngredients").html(visIngredients);
    /* getVisualIngredients(id, lsName); */
  }

  /* ------------------ Instructions ------------------ */
  /* ------------------ Meal Planning ------------------ */
  /* ********************* Event Listeners ********************* */
  /* -------- Search -------- */
  $("#searchButton").on("click", () => {
    console.log("searchButton-clicked()");
    var searchRecipe = $("#recipeSearchInput").val();
    var apiKey = "d90e6364332c482bbb5de501896cdf28";
    var queryUrl = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${searchRecipe}&number=${$(
      "#numberSelect"
    ).val()}&instructionsRequired=true&fillIngredients=true&addRecipeInformation=true&addRecipeNutrition=true`;
    let lsName = searchRecipe + $("#numberSelect").val();
    let matchFlag = 0;
    let newSearchFlag = 0;
    const lsArray = getFromLocalStorage();
    if (lsArray.length > 0) {
      lsArray.forEach((item) => {
        const randomArrayNum = Math.floor(Math.random() * lsArray.length);
        const randomResultsNum = Math.floor(
          Math.random() * lsArray[randomArrayNum].response.results.length
        );
        if (item.search === lsName) {
          matchFlag = 1;
          displayVoila(
            item.response.results[randomResultsNum].title,
            item.response.results[randomResultsNum].id,
            item.response.results[randomResultsNum].image,
            item.response.results[randomResultsNum].summary
          );
        } else {
          newSearchFlag = 1;
        }
      });
    } else {
      newSearchFlag = 1;
    }

    if (newSearchFlag === 1 && matchFlag === 0) {
      runAjaxGet(queryUrl, saveToLocalStorage, lsName);
    }

    // Reset the form
    document.querySelector(".form-inline").reset();
    $("#includeIngredientsUl").empty();
    $("#excludeIngredientsUl").empty();
  });

  $("#includeIngredientsButton").on("click", () => {
    let listItem = $("<li>");
    listItem.text($("#includeIngredientsInput").val());
    $("#includeIngredientsUl").append(listItem);
    $("#includeIngredientsInput").val("");
  });

  $("#excludeIngredientsButton").on("click", () => {
    let listItem = $("<li>");
    listItem.text($("#excludeIngredientsInput").val());
    $("#excludeIngredientsUl").append(listItem);
    $("#excludeIngredientsInput").val("");
  });
});
