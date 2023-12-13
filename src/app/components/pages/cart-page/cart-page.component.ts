import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CartDto } from 'src/app/shared/model/CartDto';
import { CartItemDto } from 'src/app/shared/model/CartItemDto';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css']
})
export class CartPageComponent {
  cart!:CartDto

  constructor(private cartService:CartService){
    this.cartService.getCartObservable().subscribe((cart)=> {
      this.cart = cart;
    })
  }

  ngOnInit(): void{

  }

  removeFromCart(cartItem:CartItemDto){
    this.cartService.removeFromCart(cartItem.food.id);
  }

  changeQuantity(cartItem:CartItemDto, quantityInString:string){
    const quantity = parseInt(quantityInString);
    this.cartService.changeQuantity(cartItem.food.id, quantity);
  }


}
