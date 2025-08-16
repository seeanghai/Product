import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CartService } from '../../Service/cartService';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styles: [`
    nav a { margin-right: 1rem; text-decoration: none; color: blue; }
    nav a:hover { text-decoration: underline; }
  `]
})
export class Navbar {
  cartCount = 0;
  constructor(private cartService: CartService) {}
  ngOnInit() {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }
}
