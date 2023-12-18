import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { LocalService } from 'src/app/services/local.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{
  cartQuantity = 0;
  constructor(cartService: CartService, localStorage:LocalService){
    cartService.getCartObservable().subscribe((newCart: { totalCount: number; }) => {
      this.cartQuantity = newCart.totalCount;
    })
  }


  ngOnInit(): void {

  }

  logout(): void {
    localStorage.clear;
    console.log("Se limpia el almacenamiento")
  }
}
