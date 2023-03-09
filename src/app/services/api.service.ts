import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getExchangeRate() {
    return this.http.get<any>('https://api.monobank.ua/bank/currency');
  }
}
