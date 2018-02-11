import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { CryptoItem } from './crypto-item';



@Injectable()
export class CryptoService {

  private apiUrl = 'https://api.coinmarketcap.com/v1/ticker/';
  constructor( private http: HttpClient ) { }

  public getCryptoRates(limit = 50): Observable<CryptoItem[]> {
    return this.http.get<CryptoItem[]>(`${this.apiUrl}?limit=${limit}`);
  }
}
