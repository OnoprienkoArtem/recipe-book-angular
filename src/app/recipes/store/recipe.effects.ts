import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map } from 'rxjs/operators';
import { Recipe } from '../recipe.model';
import { HttpClient } from '@angular/common/http';

import * as RecipesActions from './recipe.actions';

@Injectable()
export class RecipeEffects {

    url = '';

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http.get<Recipe[]>(`${this.url}recipes.json`)
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
            });
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        }),
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
    ) {}
} 
 
