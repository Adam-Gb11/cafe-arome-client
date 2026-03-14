import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MenuItem, Order } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ApiService {

  private http = inject(HttpClient);
  private base = 'http://localhost:3000/api';

  // récupérer le menu depuis MongoDB
  getMenu(): Observable<MenuItem[]> {
    return this.http.get<MenuItem[]>(`${this.base}/menu`);
  }

  // envoyer la commande vers MongoDB
  placeOrder(data: {
    tableNumber: number;
    items: { menuItemId: string; quantity: number }[];
    note: string;
  }): Observable<Order> {
    return this.http.post<Order>(`${this.base}/orders`, data);
  }
}