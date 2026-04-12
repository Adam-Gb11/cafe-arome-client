import { Routes } from '@angular/router';
import { WifiGuard } from './guards/wifi.guard';
import { MenuComponent } from './components/menu/menu';
import { NoWifiComponent } from './pages/no-wifi/no-wifi.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    //canActivate: [WifiGuard]
  },
  {
    path: 'no-wifi',
    component: NoWifiComponent
  },
  {
    path: '**',
    redirectTo: ''
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
