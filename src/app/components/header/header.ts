import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { LanguageService, Lang } from '../../services/language';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private route = inject(ActivatedRoute);
  cart          = inject(CartService);
  lang          = inject(LanguageService);

  tableNumber = this.route.snapshot.queryParams['table'] ?? '1';

  readonly langs: { code: Lang; label: string }[] = [
    { code: 'fr', label: 'FR' },
    { code: 'en', label: 'EN' },
    { code: 'ar', label: 'AR' },
  ];

  setLang(l: Lang) {
    this.lang.setLang(l);
  }
}