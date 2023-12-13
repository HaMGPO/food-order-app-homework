import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CartDto } from '../shared/model/CartDto';
import { foodDto } from '../shared/model/FoodDto';
import { CartItemDto } from '../shared/model/CartItemDto';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:CartDto = new CartDto();
  private cartSubject:BehaviorSubject<CartDto> =new BehaviorSubject(this.cart)
  constructor() { }

  // add to cart method
  addToCart(food:foodDto):void{
    let cartItem= this.cart.items.find((item: { food: { id: string; }; }) => item.food.id === food.id)
    if(cartItem)
    return;

    this.cart.items.push(new CartItemDto(food))
    this.setCartToLocalStorage();
  }

  // Remove Cart item
  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter((item: { food: { id: string; }; }) => item.food.id != foodId)
    this.setCartToLocalStorage();
  }

  // change Quantity
  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find((item: { food: { id: string; }; }) => item.food.id === foodId);
    if(!cartItem)
    return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  // clear Cart
  clearCart(){
    this.cart = new CartDto();
    this.setCartToLocalStorage();
  }

  // get cart observable mean check observable data
  getCartObservable():Observable<CartDto>{
    return this.cartSubject.asObservable();
  }

  // now set Local storage data
  private setCartToLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum: any, currentItem: { price: any; }) => prevSum + currentItem.price, 0)
    this.cart.totalCount = this.cart.items.reduce((prevSum: any, currentItem: {
      quantity: any; price: any;
}) => prevSum + currentItem.quantity, 0)

const cartJson = JSON.stringify(this.cart);
localStorage.setItem('Cart', cartJson);
this.cartSubject.next(this.cart)
  }

  // when ever set local storage data then also get data
  private getCartFromLocalStorage():CartDto{
    const cartJson = localStorage.getItem('Cart');
    return cartJson?JSON.parse(cartJson): new CartDto();
  }

  

}
// comment added
