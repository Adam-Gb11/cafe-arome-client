import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class WifiCheckService {
  constructor(private http: HttpClient) {}

  isOnCafeWifi(): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}/api/health`).pipe(
      tap(res => console.log('✅ Health OK:', res)),
      map(() => true),
      catchError((err) => {
        console.log('❌ Erreur status:', err.status);
        console.log('❌ Erreur détail:', err);
        if (err.status === 403) return of(false);
        return of(false);
      })
    );
  }
}
