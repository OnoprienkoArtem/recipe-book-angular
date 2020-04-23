import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'This is a simply test',
      imagePath: 'https://whatsinthepan.com/wp-content/uploads/2017/10/23910864668_bc8b10eb2a_c.jpg',
    },
    {
      name: 'Second test recipe',
      description: 'This second simply test recipe',
      imagePath: 'https://www.skinnytaste.com/wp-content/uploads/2009/02/turkey-meatloaf-8.jpg',
    }
  ];

  constructor() { }

  getRecipes() {
    return this.recipes.slice();
  }

}
