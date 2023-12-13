import { foodDto } from "./FoodDto";
export class CartItemDto{


  constructor(public food:foodDto){}

  quantity:number =1;
  price:number = this.food.price;
}
