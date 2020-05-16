import * as ShoppingListActions from './shopping-list.actions';

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

export function shoppingListReducer(
  state = initialState,
  action: ShoppingListActions.AddIngredient,
) {
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
  }
}
