const express = require('express')
const app = express()
const port = 3436
const bodyParser= require('body-parser');
const { request, response } = require('express');

//
// Requirement for set up the exercise
//
app.use(bodyParser.json()); // parse requests of content-type - application/json

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
     next();
});

//
// Let's start the exercise :
// 
// You have a restaurant and you want to manage the menu :
// You need to know which recipes you can sold and which ingredients you need to use,
// you also need to know what is the purchase price of a dish and what is the price you are selling it.
// ------------------------------

let recipes = [
    { id:0, name: 'Spaghetti Bolognese', ingredients:["onion", "spaghetti", "beef", "tomato sauce"], purchasePrice:30, sellingPrice:50},
    { id:1, name: 'Chicken Burger', ingredients:["onion", "tomato", "chicken", "bread", "creamy sauce", "cheese"], purchasePrice:50, sellingPrice:100},
    { id:2, name: 'Chicken curry with rice', ingredients:["rice", "chicken", "salt", "curry pasta"], purchasePrice:45, sellingPrince:70},
    { id:3, name: 'Pizza with peppers', ingredients:["pasta","onion", "peppers", "ham", "tomato sauce", "cheese"], purchasePrice:80, sellingPrice:110}
]

// Question 1 : As a manager you want to fetch all the recipes. 
// Create a HTTP Request :

app.get('/recipes',(request,response) =>{
  response.json(recipes)
});


// Question 2 : As a manager you want to get only one recipe depends on his id.
// Create a HTTP Request :

app.get('/recipes/:recipeId',(request,response) =>{
    let recipe = recipes.filter( recipe => {
     return recipe.id == request.params.recipeId
    });
    response.json(recipe)
});
// Question 3 : As a manager you want to modify the selling price of only one recipe.
// Create a HTTP Request :

app.put('/recipes/:recipeId',(request,response)=>{
  
   let newRecipe  = recipes.filter(recipe => {
        return recipe.id == request.params.recipeId
    }).map(function(recipe){
      
        recipe.sellingPrice = request.body.sellingPrice
        return recipe
    });
  response.json(newRecipe)
});

// Question 4 : As a manager you want to delete one recipe from the recipes list
// Create a HTTP Request :

app.delete('/recipes/:recipeId',(request,response) =>{
  recipes.splice(request.params.recipeId,1);
  response.json(recipes);
});


// Question 5 : As a manager you want to add a new recipe in the recipes list.
// Create a HTTP Request :

app.post('/recipes',(request,response)=>{
  
  recipes.push(request.body)
  response.json(recipes);
});


// Question 6 : As a manager you want to get all the recipes which contains a special ingredients. 
// For example you want to know which recipe contains cheese.
// Create a HTTP Request :

app.get('/recipes/special/ingredients',(request,response)=>{
  let filter =  recipes.filter(recipe =>{   
      return recipe.ingredients.includes(request.body.special)
  });
  response.json(filter);
  
});


// Question 7 : As a manager you want to get all the recipes' name. 
// For example he want to know which recipe contains cheese.
// Create a HTTP Request :

app.get('/recipes/special/ingredients/name',(request,response)=>{
  let filter =  recipes.filter(recipe =>{  
     return recipe.ingredients.includes(request.body.special)  
  }).map(function(recipe){
      return recipe.name
  });
  response.json(filter);
});
//
// End of the exercice
// ------------------------------
app.listen(port, () => console.log(`Example app listening on port ${port}!`))


