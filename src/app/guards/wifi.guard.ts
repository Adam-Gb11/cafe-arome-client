// src/app/guards/wifi.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { WifiCheckService } from '../services/wifi-check.service';

@Injectable({ providedIn: 'root' })
export class WifiGuard implements CanActivate {
  constructor(
    private wifiCheck: WifiCheckService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> {
    return this.wifiCheck.isOnCafeWifi().pipe(
      tap((allowed) => {
        if (!allowed) this.router.navigate(['/no-wifi']);
      })
    );
  }
}
