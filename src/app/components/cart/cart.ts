import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class CartComponent {
  private router = inject(Router);
  private route  = inject(ActivatedRoute);
  private api    = inject(ApiService);
  cart           = inject(CartService);
  lang           = inject(LanguageService);

  tableNumber = signal(1);
  note        = '';
  submitting  = signal(false);
  error       = signal('');

  constructor() {
    const t = this.route.snapshot.queryParamMap.get('table');
    this.tableNumber.set(Number(t) || 1);
  }

  goBack() {
    this.router.navigate(['/menu'], {
      queryParams: { table: this.tableNumber() }
    });
  }

  placeOrder() {
    if (this.cart.isEmpty()) return;
    this.submitting.set(true);
    this.error.set('');

    const payload = {
      tableNumber: this.tableNumber(),
      items: this.cart.items().map(i => ({
        menuItemId: i.menuItem._id,
        quantity:   i.quantity
      })),
      note: this.note
    };

    this.api.placeOrder(payload).subscribe({
      next: (order) => {
        this.cart.clear();
        this.router.navigate(['/success'], {
          queryParams: { orderNumber: order.orderNumber }
        });
      },
      error: () => {
        this.error.set('Erreur lors de l\'envoi. Réessaie !');
        this.submitting.set(false);
      }
    });
  }
}