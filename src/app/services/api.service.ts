import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private http = inject(HttpClient);
  private apiUrl = 'https://afe-arome-backend-production.up.railway.app/api';

  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.apiUrl}/menu`);
  }

  placeOrder(data: {
    tableNumber: number;
    items: { menuItemId: string; quantity: number }[];
    note: string;
  }): Observable<Order> {
    return this.http.post<Order>(`${this.apiUrl}/orders`, data);
  }
  // ── Reviews ──
submitReview(data: {
  tableNumber: number;
  orderNumber: string;
  rating: number;
  comment: string;
}): Observable<any> {
  return this.http.post(`${this.apiUrl}/reviews`, data);
}
// ── Calls ──
callServer(tableNumber: number): Observable<any> {
  return this.http.post(`${this.apiUrl}/calls`, { tableNumber });
}
}
