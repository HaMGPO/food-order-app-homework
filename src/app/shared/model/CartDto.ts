import { CartItemDto } from "./CartItemDto";

export class CartDto{
  items:CartItemDto[] =[];
  totalPrice:number =0;
  totalCount:number =0;
}
