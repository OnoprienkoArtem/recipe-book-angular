import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.module';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    {
      name: 'A test recipe',
      description: 'This is a simply test',
      imagePath: 'https://whatsinthepan.com/wp-content/uploads/2017/10/23910864668_bc8b10eb2a_c.jpg',
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
