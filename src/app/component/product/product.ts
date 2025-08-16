import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cartService';
import { PRODUCTS } from './products.data';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product.html',
})
export class ProductComponent {
  products = [...PRODUCTS]; // ✅ array value, not type

  constructor(private cartService: CartService) {}
trackById(index: number, product: any) {
  return product.id;
}

  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
  }
}
