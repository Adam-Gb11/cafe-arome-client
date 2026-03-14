import { Injectable, signal, computed } from '@angular/core';
import { CartItem, MenuItem } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CartService {

  private _items = signal<CartItem[]>([]);

  items   = this._items.asReadonly();
  count   = computed(() =>
    this._items().reduce((total, i) => total + i.quantity, 0)
  );
  total   = computed(() =>
    this._items().reduce((total, i) => total + i.menuItem.price * i.quantity, 0)
  );
  isEmpty = computed(() => this._items().length === 0);

  add(menuItem: MenuItem) {
    this._items.update(items => {
      const existe = items.find(i => i.menuItem._id === menuItem._id);
      if (existe) {
        return items.map(i =>
          i.menuItem._id === menuItem._id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...items, { menuItem, quantity: 1 }];
    });
  }

  remove(menuItemId: string) {
    this._items.update(items => {
      const existe = items.find(i => i.menuItem._id === menuItemId);
      if (!existe) return items;
      if (existe.quantity <= 1) {
        return items.filter(i => i.menuItem._id !== menuItemId);
      }
      return items.map(i =>
        i.menuItem._id === menuItemId
          ? { ...i, quantity: i.quantity - 1 }
          : i
      );
    });
  }

  getQty(menuItemId: string): number {
    return this._items().find(i =>
      i.menuItem._id === menuItemId
    )?.quantity ?? 0;
  }

  clear() {
    this._items.set([]);
  }
}