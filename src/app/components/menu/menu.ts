import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { LanguageService } from '../../services/language';
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
  private api    = inject(ApiService);
  private route  = inject(ActivatedRoute);
  private router = inject(Router);
  cart           = inject(CartService);
  lang           = inject(LanguageService);
  calling        = signal(false);
  callSent       = signal(false);

  tableNumber    = signal(1);
  allItems       = signal<MenuItem[]>([]);
  activeCategory = signal('all');
  loading        = signal(true);

  get categories() {
    return [
      { id: 'all',        label: this.lang.t('all') },
      { id: 'cafe',       label: '☕ ' + this.lang.t('cafe') },
      { id: 'boisson',    label: '🥤 ' + this.lang.t('boisson') },
      { id: 'patisserie', label: '🥐 ' + this.lang.t('patisserie') },
      { id: 'plat',       label: '🍽️ ' + this.lang.t('plat') },
      { id: 'dessert',    label: '🍰 ' + this.lang.t('dessert') },
    ];
  }

  get badgeLabels(): Record<string, string> {
    return {
      popular: this.lang.t('popular'),
      new:     this.lang.t('new'),
      chef:    this.lang.t('chef'),
    };
  }

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
      label:    c,
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
  callServer() {
  if (this.calling()) return;
  this.calling.set(true);
  this.api.callServer(this.tableNumber()).subscribe({
    next: () => {
      this.calling.set(false);
      this.callSent.set(true);
      setTimeout(() => this.callSent.set(false), 3000);
    },
    error: () => {
      this.calling.set(false);
    }
  });
}

  goToCart() {
    this.router.navigate(['/cart'], {
      queryParams: { table: this.tableNumber() }
    });
  }
}