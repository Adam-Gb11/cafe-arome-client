import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { MenuItem } from '../../models/models';
import { HeaderComponent } from '../header/header';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class MenuComponent implements OnInit {
  private api   = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  cart          = inject(CartService);

  tableNumber    = signal(1);
  allItems       = signal<MenuItem[]>([]);
  activeCategory = signal('all');
  loading        = signal(true);

  readonly categories = [
    { id: 'all',        label: 'Tout' },
    { id: 'cafe',       label: '☕ Cafés' },
    { id: 'boisson',    label: '🥤 Boissons' },
    { id: 'patisserie', label: '🥐 Pâtisseries' },
    { id: 'plat',       label: '🍽️ Plats' },
    { id: 'dessert',    label: '🍰 Desserts' },
  ];

  readonly categoryLabels: Record<string, string> = {
    cafe:       'Cafés & Boissons Chaudes',
    boisson:    'Boissons Froides',
    patisserie: 'Pâtisseries & Snacks',
    plat:       'Plats',
    dessert:    'Desserts',
  };

  readonly badgeLabels: Record<string, string> = {
    popular: 'Populaire',
    new:     'Nouveau',
    chef:    'Signature'
  };

  filteredItems = computed(() => {
    const cat   = this.activeCategory();
    const items = this.allItems();
    if (cat === 'all') return items;
    return items.filter(i => i.category === cat);
  });

  groupedItems = computed(() => {
    const items = this.filteredItems();
    const cats  = [...new Set(items.map(i => i.category))];
    return cats.map(c => ({
      category: c,
      label:    this.categoryLabels[c] ?? c,
      items:    items.filter(i => i.category === c),
    }));
  });

  ngOnInit() {
    const t = this.route.snapshot.queryParamMap.get('table');
    this.tableNumber.set(Number(t) || 1);
    this.api.getMenu().subscribe({
      next:  items => { this.allItems.set(items); this.loading.set(false); },
      error: ()    => this.loading.set(false),
    });
  }

  setCategory(cat: string) { this.activeCategory.set(cat); }
  add(item: MenuItem)       { this.cart.add(item); }
  remove(id: string)        { this.cart.remove(id); }
  getQty(id: string)        { return this.cart.getQty(id); }

  goToCart() {
    this.router.navigate(['/cart'], {
      queryParams: { table: this.tableNumber() }
    });
  }
}