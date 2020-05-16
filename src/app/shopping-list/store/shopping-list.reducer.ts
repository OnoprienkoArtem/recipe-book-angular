import { Action } from '@ngrx/store';
import { ADD_INGREDIENT } from './shopping-list.action';

const initialState = {
  ingredients: [
    {
      name: 'Apples',
      amount: 5
    },
    {
      name: 'Tomatoes',
      amount: 10
    }
  ]
};

export function shoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action]
      };
  }
}
