import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-success',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './success.html',
  styleUrl: './success.css'
})
export class SuccessComponent {
  private route  = inject(ActivatedRoute);
  private router = inject(Router);

  orderNumber = signal('');
  tableNumber = signal(1);

  constructor() {
    const order = this.route.snapshot.queryParamMap.get('orderNumber');
    const table = this.route.snapshot.queryParamMap.get('table');
    this.orderNumber.set(order || 'CMD-000');
    this.tableNumber.set(Number(table) || 1);
  }

  newOrder() {
    this.router.navigate(['/menu'], {
      queryParams: { table: this.tableNumber() }
    });
  }
}