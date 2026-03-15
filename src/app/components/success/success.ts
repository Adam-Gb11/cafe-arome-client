import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { LanguageService } from '../../services/language';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './success.html',
  styleUrl: './success.css'
})
export class SuccessComponent {
  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  private api    = inject(ApiService);
  lang           = inject(LanguageService);

  orderNumber = signal('');
  tableNumber = signal(1);
  rating      = signal(0);
  comment     = '';
  submitted   = signal(false);
  sending     = signal(false);

  constructor() {
    const order = this.route.snapshot.queryParamMap.get('orderNumber');
    const table = this.route.snapshot.queryParamMap.get('table');
    this.orderNumber.set(order || 'CMD-000');
    this.tableNumber.set(Number(table) || 1);
  }

  setRating(n: number) {
    this.rating.set(n);
  }

  submitReview() {
    if (this.rating() === 0) return;
    this.sending.set(true);
    this.api.submitReview({
      tableNumber: this.tableNumber(),
      orderNumber: this.orderNumber(),
      rating:      this.rating(),
      comment:     this.comment,
    }).subscribe({
      next: () => {
        this.submitted.set(true);
        this.sending.set(false);
      },
      error: () => {
        this.sending.set(false);
      }
    });
  }

  newOrder() {
    this.router.navigate(['/menu'], {
      queryParams: { table: this.tableNumber() }
    });
  }
}