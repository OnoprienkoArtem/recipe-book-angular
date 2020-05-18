import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  // recipes: Recipe[] = [
  //   {
  //     name: 'Tasty Schnitzel',
  //     description: 'A super tasty Schnitzel - just awesome!',
  //     imagePath: 'https://media-cdn.tripadvisor.com/media/photo-s/11/bb/4c/46/chicken-schnitzel-fries.jpg',
  //     ingredients: [
  //       {
  //         name: 'Meat',
  //         amount: 1,
  //       },
  //       {
  //         name: 'French Fries',
  //         amount: 20,
  //       }
  //     ],
  //   },
  //   {
  //     name: 'Big Fat Burger',
  //     description: 'What else you need to say?',
  //     imagePath: 'https://images-na.ssl-images-amazon.com/images/I/71WZQEddn4L._SL1500_.jpg',
  //     ingredients: [
  //       {
  //         name: 'Buns',
  //         amount: 2,
  //       },
  //       {
  //         name: 'Meat',
  //         amount: 1,
  //       },
  //     ],
  //   }
  // ];

  recipes: Recipe[] = [];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{shoppingList: {ingredients: Ingredient[]}}>,
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    //
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
