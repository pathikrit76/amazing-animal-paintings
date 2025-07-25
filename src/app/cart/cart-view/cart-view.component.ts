import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-cart-view',
  templateUrl: './cart-view.component.html',
  styleUrls: ['./cart-view.component.css']
})
export class CartViewComponent implements OnInit{
  cartItems: Product[] = [];
  totalCartPrice: number = 0;
  constructor(private cartService: CartService){

  }
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data=>{
      this.cartItems = data;
      this.totalCartPrice=this.getTotalPrice();
    })
  }

  getTotalPrice():number{
    let total = 0;
    for(let item of this.cartItems){
      total+=item.price;
    }
    return total;
  }

  clearCart():void{
    this.cartService.clearCart().subscribe();
  }
  checkOutItems():void{
    this.cartService.checkout(this.cartItems).subscribe();
  }

}
