import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../Service/cartService';
import { PRODUCTS } from '../product/products.data';

@Component({
  selector: 'app-detail-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detailProduct.html',
})
export class DetailProduct implements OnInit {
  products = [...PRODUCTS];  // all products
  selectedProduct: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

ngOnInit() {
  const id = +this.route.snapshot.paramMap.get('id')!;
  this.selectedProduct = this.products.find(p => p.id === id);
}
increaseQty(product: any) {
  product.qty = (product.qty || 1) + 1;
}

decreaseQty(product: any) {
  if (product.qty && product.qty > 1) {
    product.qty -= 1;
  }
}
addToCart(product: any) {
  const productToAdd = { ...product, qty: product.qty || 1 }; // ensure qty is included
  this.cartService.addToCart(productToAdd);
}
}
