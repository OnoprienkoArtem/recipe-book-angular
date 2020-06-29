import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesComponent } from './recipes.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesStartComponent } from './recipes-start/recipes-start.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';

import { RecipesRoutingModule } from './recipes-routing.module';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        RecipesRoutingModule,
    ],
    exports: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipesStartComponent,
        RecipeEditComponent,
    ]
})
export class RecipesModule {}
