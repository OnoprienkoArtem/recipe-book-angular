import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  url = '';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();

    return this.http.put(`${this.url}recipes.json`, recipes).subscribe(res => console.log(res));
  }

  fetchRecipes() {
    this.http.get<Recipe[]>(`${this.url}recipes.json`)
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
