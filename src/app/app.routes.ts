import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./component/home/home').then(m => m.Home) },
  { path: 'product', loadComponent: () => import('./component/product/product').then(m => m.ProductComponent) },
  { path: 'cart', loadComponent: () => import('./component/cart').then(m => m.CartComponent) },
  
  // Add :id parameter here
  { path: 'detailProduct/:id', loadComponent: () => import('./component/detail/detailProduct').then(m => m.DetailProduct) },
  
  { path: '**', redirectTo: '/home' },
];
