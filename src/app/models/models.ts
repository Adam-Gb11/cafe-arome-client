// Un article du menu
export interface MenuItem {
  _id:         string;
  name:        string;
  description: string;
  price:       number;
  category:    string;
  emoji:       string;
  badge:       string | null;
  available:   boolean;
}

// Un article dans le panier
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
}

// Une commande envoyée au backend
export interface Order {
  _id:         string;
  orderNumber: string;
  tableNumber: number;
  total:       number;
  note:        string;
  status:      string;
  createdAt:   string;
}