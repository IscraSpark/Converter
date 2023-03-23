import { IConvertor } from './interfaces/interfaces';
import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'converter';
  moneyData: { [value: string]: number } = {}

  constructor ( private api: ApiService ) {}

  ngOnInit(): void {
    this.api.getExchangeRate().pipe(take(1)).subscribe(data => {
      // 978 - EUR, 980 - UAH, 840 - USD
      data.forEach((item: IConvertor) => {
        this.moneyData[item.currencyCodeA + '_' + item.currencyCodeB] = item.rateBuy;
        this.moneyData[item.currencyCodeB + '_' + item.currencyCodeA] = 1 / item.rateBuy;
      })
    });
    
    
  }


}
