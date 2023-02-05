import { Injectable } from '@angular/core';
import { sample_foods } from 'src/data';
import { food } from '../shared/model/Food';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll():food[]{
    return sample_foods;
  }

  // search food
  getAllFoodBySearchTerm(searchTerm:string){
    return this.getAll().filter(food =>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  // getAllFoodByTag(tag:string)[]{
  //   return tag === "All"? this.getAll():this.getAll().filter(food=> food.tags?.includes())
  // }

  // get food by Id
  getFoodById(foodId:string){
    return this.getAll().find(food => food.id)?? new food();
  }

}
