import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../Service/cartService';
import { PRODUCTS } from '../product/products.data'; // Import the products
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.html',
})
export class Home {
  products = PRODUCTS;

  constructor(private cartService: CartService) {}
  trackById(index: number, product: any) {
  return product.id;}


  addToCart(product: any) {
    this.cartService.addToCart(product);
    console.log('Added to cart:', product);
  }
}
