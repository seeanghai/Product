import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSource = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSource.asObservable();
  private playSound(file: string) {
  const audio = new Audio(`assets/sounds/${file}`);
  audio.play();
}
  private cartCountSource = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSource.asObservable();

  constructor() {
    this.loadCartFromStorage();
  }

  private loadCartFromStorage() {
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
    this.cartItemsSource.next(storedCart);
    this.cartCountSource.next(storedCart.length);
  }

  addToCart(product: any) {
  const currentCart = [...this.cartItemsSource.value];
  const existingProduct = currentCart.find(item => item.id === product.id);

  if (existingProduct) {
    existingProduct.qty = (existingProduct.qty || 1) + (product.qty || 1);
  } else {
    currentCart.push({ ...product, qty: product.qty || 1 });
  }

  this.updateCart(currentCart);

  Swal.fire({
    title: 'Added!',
    text: 'Product added to your cart.',
    icon: 'success',
    timer: 1500,
    showConfirmButton: false,
    didOpen: () => {
      this.playSound('add.mp3');
    }
  });
}


removeItem(index: number) {
  Swal.fire({
    title: 'Are you sure?',
    text: 'This product will be removed from your cart!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then((result) => {
    if (result.isConfirmed) {
      const currentCart = [...this.cartItemsSource.value];
      currentCart.splice(index, 1);
      this.updateCart(currentCart);

      Swal.fire({
        title: 'Deleted!',
        text: 'Product has been removed from your cart.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        didOpen: () => {
          this.playSound('remove.mp3'); // 🔊 Play delete sound in sync
        }
      });
    }
  });
}


clearCart() {
  Swal.fire({
    title: 'Clear Cart?',
    text: 'All items will be removed from your cart!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, clear it!',
    cancelButtonText: 'Cancel'
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem('cart');
      this.updateCart([]);

      Swal.fire({
        title: 'Cleared!',
        text: 'Your cart is now empty.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        didOpen: () => {
          this.playSound('clear.mp3'); // 🔊 play in sync with popup
        }
      });
    }
  });
}


  updateQty(productId: number, qty: number) {
    const currentCart = [...this.cartItemsSource.value];
    const product = currentCart.find(item => item.id === productId);
    if (product) {
      product.qty = qty;
      this.updateCart(currentCart);
    }
  }

  private updateCart(cart: any[]) {
    localStorage.setItem('cart', JSON.stringify(cart));
    this.cartItemsSource.next(cart);
    this.cartCountSource.next(cart.length);
  }
}
