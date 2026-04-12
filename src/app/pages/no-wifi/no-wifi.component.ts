import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";

@Component({
  selector: 'app-no-wifi',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="no-wifi-container">
      <span class="icon">☕</span>
      <h1>Bienvenue à THE ELO</h1>
      <p>Connectez-vous au Wi-Fi du café pour accéder au menu.</p>
      <p class="network">
        <strong>Réseau :</strong> THE_ELO_WIFI
      </p>
      <button (click)="retry()">Réessayer</button>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      background: #fff;
    }
    .no-wifi-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      gap: 16px;
      text-align: center;
      padding: 24px;
      background: #fff;
      color: #333;
    }
    .icon { font-size: 64px; }
    h1 { font-size: 24px; margin: 0; color: #222; }
    p { color: #666; margin: 0; }
    .network {
      background: #f5f5f5;
      padding: 12px 24px;
      border-radius: 8px;
      color: #333;
    }
    button {
      margin-top: 8px;
      padding: 12px 32px;
      background: #4a2c2a;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
    }
    button:hover {
      background: #6b3f3c;
    }
  `]
})
export class NoWifiComponent {
  retry() {
    window.location.href = '/';
  }
}
