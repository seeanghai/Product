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

  constructor(private cartService: CartService) {}

  ngOnInit() {
    // Subscribe to cartItems observable to update in real time
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
    });
  }

  // Remove single item
  removeItem(index: number) {
    this.cartService.removeItem(index);
  }

  // Clear all items
  clearCart() {
    this.cartService.clearCart();
  }

  // Increase quantity
  increaseQty(item: any) {
    this.cartService.updateQty(item.id, (item.qty || 1) + 1);
  }

  // Decrease quantity
  decreaseQty(item: any) {
    if ((item.qty || 1) > 1) {
      this.cartService.updateQty(item.id, (item.qty || 1) - 1);
    }
  }

  // Total price
  getTotalPrice(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + item.price * (item.qty || 1),
      0
    );
  }
}
