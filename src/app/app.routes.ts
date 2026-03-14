import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'menu',
    loadComponent: () =>
      import('./components/menu/menu')
        .then(m => m.MenuComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('./components/cart/cart')
        .then(m => m.CartComponent),
  },
  {
    path: 'success',
    loadComponent: () =>
      import('./components/success/success')
        .then(m => m.SuccessComponent),
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
];