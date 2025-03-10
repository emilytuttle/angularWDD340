import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';


@Component({
  selector: 'app-shopping-list',
  standalone: false,
  
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[]

  private igChangeSub: Subscription
  constructor (private slService: ShoppingListService) {
    
  }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.igChangeSub = this.slService.ingredientsChanged
    .subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = this.ingredients
      }
    )
  }

  onEditItem(index: number) {
    this.slService.startedEditing.next(index)
  }

  ngOnDestroy(): void {
    this.igChangeSub.unsubscribe()
  }

}
