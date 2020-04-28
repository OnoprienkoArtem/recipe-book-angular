import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

  recipes: Recipe[] = [
    {
      name: 'Tasty Schnitzel',
      description: 'A super tasty Schnitzel - just awesome!',
      // tslint:disable-next-line:max-line-length
      imagePath: 'https://media-cdn.tripadvisor.com/media/photo-s/11/bb/4c/46/chicken-schnitzel-fries.jpg',
      ingredients: [
        {
          name: 'Meat',
          amount: 1,
        },
        {
          name: 'French Fries',
          amount: 20,
        }
      ],
    },
    {
      name: 'Big Fat Burger',
      description: 'What else you need to say?',
      imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71WZQEddn4L._SL1500_.jpg',
      ingredients: [
        {
          name: 'Buns',
          amount: 2,
        },
        {
          name: 'Meat',
          amount: 1,
        },
      ],
    }
  ];

  constructor(private shoppingListService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

}
