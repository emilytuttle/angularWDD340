import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';


@Component({
  selector: 'app-recipe-list',
  standalone: false,
  
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is a test recipe', 'https://lobsterfrommaine.com/wp-content/uploads/fly-images/1569/20210503-MLMC-Spring-Radish-Pea-Lobster-Salad-Labneh2883-scaled-1024x576-c.jpg')
  ];

  constructor() {};

  ngOnInit() {}
}
