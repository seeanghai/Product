import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../Service/cartService';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.html',
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  // Exchange rate USD -> KHR
  exchangeRate = 4000;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  increaseQty(item: any) {
    this.cartService.updateQty(item.id, (item.qty || 1) + 1);
  }

  decreaseQty(item: any) {
    if ((item.qty || 1) > 1) {
      this.cartService.updateQty(item.id, (item.qty || 1) - 1);
    }
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.price * (item.qty || 1)),
      0
    );
  }

  getTotalAmountUSD(): number {
    return this.cartItems.reduce(
      (sum, item) =>
        sum +
        ((item.discountPrice ??
          item.price * (1 - (item.discount || 0) / 100)) *
          (item.qty || 1)),
      0
    );
  }

  getTotalAmountKHR(): number {
    return this.getTotalAmountUSD() * this.exchangeRate;
  }

  getTotalSavings(): number {
    return this.getTotalPrice() - this.getTotalAmountUSD();
  }
}
