import { Injectable, signal } from '@angular/core';

export type Lang = 'fr' | 'en' | 'ar';

const translations: Record<Lang, Record<string, string>> = {
  fr: {
    title:        'CAFÉ ARÔME',
    subtitle:     'ARTISAN · DEPUIS 2018',
    table:        'TABLE',
    all:          'TOUT',
    cafe:         'CAFÉS',
    boisson:      'BOISSONS',
    patisserie:   'PÂTISSERIES',
    plat:         'PLATS',
    dessert:      'DESSERTS',
    loading:      'Chargement du menu...',
    add:          'Ajouter',
    cart:         'Mon Panier',
    empty_cart:   'Votre panier est vide',
    note:         'Note pour la cuisine...',
    total:        'Total',
    order:        'Commander',
    ordering:     'Commande en cours...',
    success:      'Commande envoyée !',
    success_msg:  'Votre commande a été transmise à la cuisine.',
    order_num:    'Commande N°',
    popular:      'Populaire',
    new:          'Nouveau',
    chef:         'Signature',
    tnd:          'TND',
  },
  en: {
    title:        'CAFÉ ARÔME',
    subtitle:     'ARTISAN · SINCE 2018',
    table:        'TABLE',
    all:          'ALL',
    cafe:         'COFFEES',
    boisson:      'DRINKS',
    patisserie:   'PASTRIES',
    plat:         'DISHES',
    dessert:      'DESSERTS',
    loading:      'Loading menu...',
    add:          'Add',
    cart:         'My Cart',
    empty_cart:   'Your cart is empty',
    note:         'Note for the kitchen...',
    total:        'Total',
    order:        'Order',
    ordering:     'Ordering...',
    success:      'Order sent!',
    success_msg:  'Your order has been sent to the kitchen.',
    order_num:    'Order N°',
    popular:      'Popular',
    new:          'New',
    chef:         'Signature',
    tnd:          'TND',
  },
  ar: {
    title:        'كافيه أروم',
    subtitle:     'حرفي · منذ 2018',
    table:        'طاولة',
    all:          'الكل',
    cafe:         'قهوة',
    boisson:      'مشروبات',
    patisserie:   'معجنات',
    plat:         'أطباق',
    dessert:      'حلويات',
    loading:      'جاري تحميل القائمة...',
    add:          'إضافة',
    cart:         'سلة الطلب',
    empty_cart:   'سلتك فارغة',
    note:         'ملاحظة للمطبخ...',
    total:        'المجموع',
    order:        'اطلب',
    ordering:     'جاري الطلب...',
    success:      'تم إرسال الطلب!',
    success_msg:  'تم إرسال طلبك إلى المطبخ.',
    order_num:    'طلب رقم',
    popular:      'الأكثر طلباً',
    new:          'جديد',
    chef:         'توقيع الشيف',
    tnd:          'دينار',
  }
};

@Injectable({ providedIn: 'root' })
export class LanguageService {
  lang = signal<Lang>('fr');

  t(key: string): string {
    return translations[this.lang()][key] ?? key;
  }

  setLang(l: Lang) {
    this.lang.set(l);
    document.dir = l === 'ar' ? 'rtl' : 'ltr';
  }
}