import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.scss']
})
export class ShoppingEditComponent implements OnInit {

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = {
      name: value.name,
      amount: value.amount,
    };
    this.shoppingListService.addIngredient(newIngredient);
  }
}
