import { Injectable } from "@angular/core";

import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";



@Injectable()
export class RecipeService {
    
    private recipes: Recipe[] = [
        new Recipe('Radish Pea Lobster Salad', 'The tastiest lobster salad you could ask for!', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg', [new Ingredient('peas', 25), new Ingredient('lobster', 1), new Ingredient('lettuce', 1)]),
        new Recipe('A Different Salad', 'This looks the same but is different', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg', [new Ingredient('sweet peas', 25), new Ingredient('crab', 1), new Ingredient('spinach', 1)])
      ];

      constructor(private slService: ShoppingListService) {

      }

      getRecipes() {
        return this.recipes.slice();
      }

      getRecipe(index: number) {
        return this.recipes[index]
      }

      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
}