import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/model/Cart';
import { food } from '../shared/model/Food';
import { CartItem } from '../shared/model/CartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart:Cart = new Cart();
  private cartSubject:BehaviorSubject<Cart> =new BehaviorSubject(this.cart)
  constructor() { }

  // add to cart method
  addToCart(food:food):void{
    let cartItem= this.cart.items.find((item: { food: { id: string; }; }) => item.food.id === food.id)
    if(cartItem)
    return;

    this.cart.items.push(new CartItem(food));
    this.setCartLocalStorage();
  }

  // Remove Cart item
  removeFromCart(foodId:string):void{
    this.cart.items = this.cart.items.filter((item: { food: { id: string; }; }) => item.food.id != foodId);
    this.setCartLocalStorage();
  }

  // change Quantity
  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find((item: { food: { id: string; }; }) => item.food.id === foodId);
    if(!cartItem)
    return;


    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartLocalStorage();
  }

  // clear cart
  clearCart():void{
    this.cart = new Cart();
    this.cartSubject.next(this.cart);
    this.setCartLocalStorage();
  }

  // get cart observable means check observe data
  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  // now start local storage data
  private setCartLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum: any, currentItem: { price: any; }) => prevSum + currentItem.price, 0);
    this.cart.totalCount = this.cart.items.reduce((prevSum: any, currentItem: { quantity: any; }) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('cart', cartJson);
    this.cartSubject.next(this.cart);
  }

  // when ever set local storage data then also get data
  private getCartFromLocalStorage():Cart{
    const cartJson = localStorage.getItem('cart');
    return cartJson?JSON.parse(cartJson):new Cart();
  }
}
